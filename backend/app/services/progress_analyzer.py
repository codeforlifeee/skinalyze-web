import cv2
import numpy as np
from typing import Dict, List, Tuple
from datetime import datetime

class ProgressAnalyzer:
    """
    Analyzes longitudinal progress by comparing images across visits.
    Tracks lesion area, redness, pigmentation, and patch characteristics.
    """
    
    def analyze_progress(self, baseline_path: str, current_path: str) -> Dict:
        """
        Compare baseline and current images to quantify progress.
        
        Returns:
            Dict containing:
            - lesionAreaChange: Percentage change in affected area
            - rednessChange: Change in erythema intensity
            - pigmentationChange: Change in pigmentation
            - metrics: Detailed metric values
        """
        baseline_img = cv2.imread(baseline_path)
        current_img = cv2.imread(current_path)
        
        # Align images
        aligned_current = self._align_images(baseline_img, current_img)
        
        # Calculate metrics
        lesion_change = self._calculate_lesion_area_change(baseline_img, aligned_current)
        redness_change = self._calculate_redness_change(baseline_img, aligned_current)
        pigmentation_change = self._calculate_pigmentation_change(baseline_img, aligned_current)
        
        return {
            "lesionAreaChange": round(lesion_change, 2),
            "rednessChange": round(redness_change, 2),
            "pigmentationChange": round(pigmentation_change, 2),
            "metrics": {
                "lesionArea": {
                    "baseline": 0,  # Calculate actual value
                    "current": 0,
                    "changePercent": lesion_change
                },
                "rednessIndex": {
                    "baseline": 0,
                    "current": 0,
                    "changePercent": redness_change
                },
                "pigmentation": {
                    "baseline": 0,
                    "current": 0,
                    "changePercent": pigmentation_change
                }
            }
        }
    
    def _align_images(self, reference: np.ndarray, target: np.ndarray) -> np.ndarray:
        """Align target image to reference using feature matching"""
        # Convert to grayscale
        ref_gray = cv2.cvtColor(reference, cv2.COLOR_BGR2GRAY)
        target_gray = cv2.cvtColor(target, cv2.COLOR_BGR2GRAY)
        
        # Detect ORB features
        orb = cv2.ORB_create(5000)
        kp1, des1 = orb.detectAndCompute(ref_gray, None)
        kp2, des2 = orb.detectAndCompute(target_gray, None)
        
        # Match features
        matcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        matches = matcher.match(des1, des2)
        matches = sorted(matches, key=lambda x: x.distance)
        
        # Extract matched keypoints
        points1 = np.float32([kp1[m.queryIdx].pt for m in matches[:50]])
        points2 = np.float32([kp2[m.trainIdx].pt for m in matches[:50]])
        
        # Find homography
        H, _ = cv2.findHomography(points2, points1, cv2.RANSAC)
        
        # Warp target image
        height, width = reference.shape[:2]
        aligned = cv2.warpPerspective(target, H, (width, height))
        
        return aligned
    
    def _calculate_lesion_area_change(self, baseline: np.ndarray, 
                                     current: np.ndarray) -> float:
        """Calculate percentage change in lesion area"""
        baseline_mask = self._segment_lesion(baseline)
        current_mask = self._segment_lesion(current)
        
        baseline_area = np.sum(baseline_mask > 0)
        current_area = np.sum(current_mask > 0)
        
        if baseline_area == 0:
            return 0.0
        
        change = ((current_area - baseline_area) / baseline_area) * 100
        return -change  # Negative change means improvement
    
    def _calculate_redness_change(self, baseline: np.ndarray, 
                                  current: np.ndarray) -> float:
        """Calculate change in redness index"""
        baseline_red = self._calculate_redness_index(baseline)
        current_red = self._calculate_redness_index(current)
        
        if baseline_red == 0:
            return 0.0
        
        change = ((current_red - baseline_red) / baseline_red) * 100
        return -change
    
    def _calculate_pigmentation_change(self, baseline: np.ndarray, 
                                       current: np.ndarray) -> float:
        """Calculate change in pigmentation"""
        baseline_pig = self._calculate_pigmentation_index(baseline)
        current_pig = self._calculate_pigmentation_index(current)
        
        if baseline_pig == 0:
            return 0.0
        
        change = ((current_pig - baseline_pig) / baseline_pig) * 100
        return change
    
    def _segment_lesion(self, image: np.ndarray) -> np.ndarray:
        """Segment lesion area from image"""
        # Convert to HSV
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        # Define range for skin tones (simplified)
        lower = np.array([0, 20, 70])
        upper = np.array([20, 255, 255])
        
        mask = cv2.inRange(hsv, lower, upper)
        
        # Apply morphological operations
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        
        return mask
    
    def _calculate_redness_index(self, image: np.ndarray) -> float:
        """Calculate average redness intensity"""
        # Extract red channel
        red_channel = image[:, :, 2].astype(float)
        green_channel = image[:, :, 1].astype(float)
        
        # Calculate redness index
        redness = red_channel - green_channel
        
        return float(np.mean(redness))
    
    def _calculate_pigmentation_index(self, image: np.ndarray) -> float:
        """Calculate average pigmentation level"""
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        return float(np.mean(gray))
    
    def generate_heatmap_delta(self, baseline_path: str, 
                               current_path: str) -> np.ndarray:
        """Generate color-coded heatmap showing improvement/degradation"""
        baseline = cv2.imread(baseline_path)
        current = cv2.imread(current_path)
        
        # Align images
        aligned_current = self._align_images(baseline, current)
        
        # Calculate difference
        diff = cv2.absdiff(baseline, aligned_current)
        diff_gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
        
        # Create heatmap
        heatmap = cv2.applyColorMap(diff_gray, cv2.COLORMAP_JET)
        
        # Overlay on current image
        result = cv2.addWeighted(aligned_current, 0.6, heatmap, 0.4, 0)
        
        return result
