#include "basic/mergesort.hpp"
#include <gtest/gtest.h>
#include <vector>


TEST(MergesortTest, BasicAssertions) {
    vector<int> v = { 4, 3, 2, 7, -1, -4, 9 };
    mergeSort(v);

    EXPECT_EQ(v[0], -4);
    EXPECT_EQ(v[4], 4);

    v.push_back(-10);
    mergeSort(v);
    EXPECT_EQ(v[0], -10);
}
