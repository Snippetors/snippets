#ifndef SRC_DATA_STRUCTURE_BIT_HPP_
#define SRC_DATA_STRUCTURE_BIT_HPP_

#include <iostream>
#include <vector>

using namespace std;
using ll = int64_t;

class BIT {
 private:
    vector<ll> bitArr;
    vector<ll> nums;   // 1-indexed
    ll M = 1e9 + 7;

 public:
    // initialize object with given nums array
    BIT(const vector<int>& nums) {
        int n = nums.size();
        this->bitArr.resize(n + 1, 0);
        this->nums.resize(n + 1, 0);

        for (int i = 0; i < n; ++i) {
            updateDelta(i, nums[i]);
        }
    }

    // update nums[idx+1] to val  (1-indexed)
    // original 'idx' is 0-indexed
    void updateDelta(int idx, ll val) {
        idx++;
        ll delta = val - nums[idx];
        nums[idx] = val;

        while (idx < bitArr.size()) {
            bitArr[idx] += delta;
            bitArr[idx] %= M;
            idx += idx & (-idx);
        }
    }

    // sum of a range nums[1:j] inclusively, 1-indexed
    // origianl 'idx' is 0-indexed
    ll queryPreSum(int idx) {
        if (idx < 0) { return 0; }

        idx++;
        ll result = 0;
        while (idx) {
            result += bitArr[idx];
            result %= M;
            idx -= idx & (-idx);
        }
        return result;
    }

    // sum of a range nums[i:j] inclusively
    // original 'i' and 'j' are 0-indexed
    ll sumRange(int i, int j) {
        return queryPreSum(j) - queryPreSum(i - 1);
    }
};

#endif  //  SRC_DATA_STRUCTURE_BIT_HPP_
