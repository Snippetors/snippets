#ifndef SRC_DATA_STRUCTURE_TRIE_HPP_
#define SRC_DATA_STRUCTURE_TRIE_HPP_

#include <iostream>
#include <string>

using namespace std;

class Trie {
 private:
	Trie* next[26];
	bool isEnd;

 public:
    Trie() {
        for (int i = 0; i < 26; ++i) { next[i] = nullptr; }
        isEnd = false;
	}
    void insert(const string& s) {  // insert new word
        Trie* curr = this;
        for (const auto& ch : s) {
            if (curr->next[ch - 'a'] == nullptr) {
                curr->next[ch - 'a'] = new Trie();
            }
            curr = curr->next[ch - 'a'];
        }
        curr->isEnd = true;
    }
    bool search(const string& s) {  // search with given word
        Trie* curr = this;
        for (const auto& ch : s) {
            if (curr->next[ch - 'a'] == nullptr) { return false; }
            curr = curr->next[ch - 'a'];
        }
        return curr->isEnd;
    }
    bool startWith(const string& prefix) {  // search with given prefix
        Trie* curr = this;
        for (const auto& ch : prefix) {
            if (curr->next[ch - 'a'] == nullptr) { return false; }
            curr = curr->next[ch - 'a'];
        }
        return true;
    }
};


#endif  //  SRC_DATA_STRUCTURE_TRIE_HPP_
