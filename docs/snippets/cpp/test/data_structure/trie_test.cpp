#include "data_structure/trie.hpp"
#include <gtest/gtest.h>
#include <string>


TEST(TrieTest, BasicAssertions) {
    Trie* t = new Trie();
    t->insert("hello");
    t->insert("snippets");
    t->insert("abcc");
    t->insert("coffee");
    t->insert("after");

    EXPECT_TRUE(t->search("coffee"));
    EXPECT_FALSE(t->search("water"));
    EXPECT_TRUE(t->startWith("a"));
    EXPECT_FALSE(t->startWith("zz"));
}
