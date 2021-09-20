#include "basic/quicksort.hpp"
#include <gtest/gtest.h>
#include <vector>


TEST(QuicksortTest, BasicAssertions) {
    vector<int> v = { 4, 3, 2, 7, -1, -4, 9 };
    quicksort(v, 0, 4);

    EXPECT_EQ(v[0], -1);
    EXPECT_EQ(v[4], 7);

    quicksort(v, 0, 6);
    EXPECT_EQ(v[0], -4);
    EXPECT_EQ(v[6], 9);
}
