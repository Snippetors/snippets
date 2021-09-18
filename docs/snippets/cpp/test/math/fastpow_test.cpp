#include "math/fastpow.hpp"
#include <gtest/gtest.h>

TEST(FastpowTest, BasicAssertions) {
    EXPECT_EQ(fastpow(2, 10), 1024);
    EXPECT_EQ(fastpow(5, 25), 790790578);
    EXPECT_EQ(fastpow(2, 0), 1);
    EXPECT_EQ(fastpow(1024, 1024), 446371492);
}
