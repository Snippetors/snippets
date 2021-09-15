#include <gtest/gtest.h>
#include "misc/hello.hpp"

TEST(HelloTest, BasicAssertions) {
    EXPECT_EQ(hello(), 0);
}
