#include <gtest/gtest.h>
#include "misc/quickpow.hpp"

TEST(QuickpowTest, BasicAssertions) {
    EXPECT_EQ(quickpow(2, 10), 1024);
    EXPECT_EQ(quickpow(5, 25), 790790578);
    EXPECT_EQ(quickpow(2, 0), 1);
    EXPECT_EQ(quickpow(1024, 1024), 446371492);
}
