#!/usr/bin/env python3
"""
Test script for the Upload Floorplan feature
Tests both the backend API and frontend integration
"""

import requests
import time
import os
import json
from pathlib import Path

# Colors for output
class Colors:
    RED = '\033[0;31m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    NC = '\033[0m'  # No Color

def print_status(message, status="INFO"):
    """Print colored status messages"""
    if status == "SUCCESS":
        print(f"{Colors.GREEN}✅ {message}{Colors.NC}")
    elif status == "ERROR":
        print(f"{Colors.RED}❌ {message}{Colors.NC}")
    elif status == "WARNING":
        print(f"{Colors.YELLOW}⚠️  {message}{Colors.NC}")
    else:
        print(f"{Colors.BLUE}ℹ️  {message}{Colors.NC}")

def test_backend_health():
    """Test if the backend server is running"""
    print_status("Testing backend server health...")
    try:
        response = requests.get("http://localhost:8000/", timeout=5)
        if response.status_code == 200:
            print_status("Backend server is running", "SUCCESS")
            return True
        else:
            print_status(f"Backend server returned status code: {response.status_code}", "ERROR")
            return False
    except requests.exceptions.RequestException as e:
        print_status(f"Backend server is not accessible: {e}", "ERROR")
        return False

def test_frontend_health():
    """Test if the frontend server is running"""
    print_status("Testing frontend server health...")
    try:
        response = requests.get("http://localhost:8080/", timeout=5)
        if response.status_code == 200:
            print_status("Frontend server is running", "SUCCESS")
            return True
        else:
            print_status(f"Frontend server returned status code: {response.status_code}", "ERROR")
            return False
    except requests.exceptions.RequestException as e:
        print_status(f"Frontend server is not accessible: {e}", "ERROR")
        return False

def test_upload_endpoint():
    """Test the upload floorplan API endpoint"""
    print_status("Testing upload floorplan API endpoint...")
    
    # Check if test image exists
    test_image_path = Path("roomba_mapping/data/roomba_map.jpeg")
    if not test_image_path.exists():
        print_status("Test image not found, creating a dummy test...", "WARNING")
        # Create a simple test image for testing
        from PIL import Image
        import numpy as np
        
        # Create a simple test image
        img_array = np.random.randint(0, 255, (100, 100, 3), dtype=np.uint8)
        img = Image.fromarray(img_array)
        test_image_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(test_image_path)
        print_status("Created test image", "SUCCESS")
    
    # Prepare test data
    test_data = {
        'store_id': 'test_store',
        'floor_id': 'test_floor'
    }
    
    files = {
        'file': ('test_floorplan.jpg', open(test_image_path, 'rb'), 'image/jpeg')
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/process-map",
            data=test_data,
            files=files,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success'):
                print_status("Upload endpoint test successful", "SUCCESS")
                print_status(f"Processed image: {result.get('processed_image')}", "SUCCESS")
                print_status(f"Vertices file: {result.get('vertices_file')}", "SUCCESS")
                return True
            else:
                print_status(f"Upload failed: {result.get('error')}", "ERROR")
                return False
        else:
            print_status(f"Upload endpoint returned status code: {response.status_code}", "ERROR")
            return False
            
    except requests.exceptions.RequestException as e:
        print_status(f"Upload endpoint test failed: {e}", "ERROR")
        return False
    finally:
        files['file'][1].close()

def test_frontend_page():
    """Test if the frontend page loads correctly"""
    print_status("Testing frontend page accessibility...")
    try:
        response = requests.get(
            "http://localhost:8080/staff%20page%20v2%20-%20login%20try.html",
            timeout=10
        )
        if response.status_code == 200:
            content = response.text
            # Check for key elements
            if 'updatefloorplanBtn' in content and 'floorplanModal' in content:
                print_status("Frontend page loads correctly with upload feature", "SUCCESS")
                return True
            else:
                print_status("Frontend page missing upload feature elements", "ERROR")
                return False
        else:
            print_status(f"Frontend page returned status code: {response.status_code}", "ERROR")
            return False
    except requests.exceptions.RequestException as e:
        print_status(f"Frontend page test failed: {e}", "ERROR")
        return False

def test_cors_configuration():
    """Test CORS configuration"""
    print_status("Testing CORS configuration...")
    try:
        # Test preflight request
        headers = {
            'Origin': 'http://localhost:8080',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        
        response = requests.options("http://localhost:8000/process-map", headers=headers, timeout=5)
        
        if response.status_code in [200, 204]:
            print_status("CORS preflight request successful", "SUCCESS")
            return True
        else:
            print_status(f"CORS preflight request failed: {response.status_code}", "ERROR")
            return False
    except requests.exceptions.RequestException as e:
        print_status(f"CORS test failed: {e}", "ERROR")
        return False

def run_all_tests():
    """Run all tests"""
    print(f"{Colors.BLUE}🧪 Running Upload Floorplan Feature Tests{Colors.NC}")
    print("=" * 50)
    
    tests = [
        ("Backend Health Check", test_backend_health),
        ("Frontend Health Check", test_frontend_health),
        ("CORS Configuration", test_cors_configuration),
        ("Frontend Page Load", test_frontend_page),
        ("Upload API Endpoint", test_upload_endpoint),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n{Colors.BLUE}📋 {test_name}{Colors.NC}")
        print("-" * 30)
        
        try:
            if test_func():
                passed += 1
            else:
                print_status(f"{test_name} failed", "ERROR")
        except Exception as e:
            print_status(f"{test_name} failed with exception: {e}", "ERROR")
        
        time.sleep(1)  # Brief pause between tests
    
    # Summary
    print(f"\n{Colors.BLUE}📊 Test Summary{Colors.NC}")
    print("=" * 30)
    print_status(f"Tests passed: {passed}/{total}")
    
    if passed == total:
        print_status("🎉 All tests passed! Upload floorplan feature is working correctly.", "SUCCESS")
        return True
    else:
        print_status(f"⚠️  {total - passed} test(s) failed. Please check the issues above.", "WARNING")
        return False

if __name__ == "__main__":
    # Check if requests module is available
    try:
        import requests
    except ImportError:
        print_status("requests module not found. Installing...", "WARNING")
        os.system("pip install requests")
        import requests
    
    success = run_all_tests()
    
    if success:
        print(f"\n{Colors.GREEN}🚀 Ready to use! Open http://localhost:8080/staff%20page%20v2%20-%20login%20try.html{Colors.NC}")
    else:
        print(f"\n{Colors.RED}❌ Some tests failed. Please fix the issues before using the feature.{Colors.NC}")
    
    exit(0 if success else 1) 