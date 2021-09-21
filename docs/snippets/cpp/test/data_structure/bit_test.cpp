#include "data_structure/bit.hpp"
#include <gtest/gtest.h>
#include <vector>


TEST(BitTest, BasicAssertions) {
    vector<int> v = { 1, 2, 6, 0, 0 };
    BIT* tree = new BIT(v);

    EXPECT_EQ(tree->sumRange(0, 2), 9);
    EXPECT_EQ(tree->sumRange(2, 4), 6);

    tree->updateDelta(0, 4);
    tree->updateDelta(4, 5);

    EXPECT_EQ(tree->sumRange(0, 2), 12);
    EXPECT_EQ(tree->sumRange(2, 4), 11);
    EXPECT_EQ(tree->sumRange(0, 0), 4);
}
