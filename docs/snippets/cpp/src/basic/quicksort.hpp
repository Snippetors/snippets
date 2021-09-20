#ifndef SRC_BASIC_QUICKSORT_HPP_
#define SRC_BASIC_QUICKSORT_HPP_

#include <iostream>
#include <vector>
#include <algorithm>
#include <utility>

using namespace std;
int partition(vector<int>& nums, int left, int right) {
    if (left >= right) { return left; }
    int pivot = nums[left], pos = left;
    for (int i = left + 1; i <= right; ++i) {
        if (nums[i] < pivot) {
            swap(nums[++pos], nums[i]);
        }
    }
    swap(nums[pos], nums[left]);
    return pos;
}

void quicksort(vector<int>& nums, int left, int right) {  
    //closed interval [left, right] 
    if (left < right) {
        int pos = partition(nums, left, right);
        quicksort(nums, left, pos - 1);
        quicksort(nums, pos + 1, right);
    }
}

#endif  // SRC_BASIC_QUICKSORT_HPP_
