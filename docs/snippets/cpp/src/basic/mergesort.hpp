#ifndef SRC_BASIC_MERGESORT_HPP_
#define SRC_BASIC_MERGESORT_HPP_

#include <iostream>
#include <vector>
#include <algorithm>
#include <utility>

using namespace std;
using itr = vector<pair<int, int>>::iterator;
void mergeSortHelper(itr left, itr right);

// recursive
void mergeSort(vector<int>& nums) {
    mergeSortHelper(nums.begin(), nums.end());
}

void mergeSortHelper(itr left, itr right) {
    if (left >= right - 1) { return; }
    // 'right' refers to the end and represents no actual values

    itr mid = left + (right - left) / 2;
    mergeSortHelper(left, mid);
    mergeSortHelper(mid, right);

    inplace_merge(left, mid, right);
}

#endif  // SRC_BASIC_MERGESORT_HPP_
