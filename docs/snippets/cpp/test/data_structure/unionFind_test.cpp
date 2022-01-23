#include "data_structure/unionFind.hpp"
#include <gtest/gtest.h>


TEST(UnionFindTest, BasicAssertions) {
    UnionFind* uf = new UnionFind(10);
    uf->join(0, 1);
    uf->join(1, 2);
    uf->join(3, 4);
    uf->join(3, 10);

    EXPECT_TRUE(uf->join(0, 2));
    EXPECT_FALSE(uf->join(0, 5));
    EXPECT_TRUE(uf->join(3, 10));
    EXPECT_FALSE(uf->join(4, 5));
}
