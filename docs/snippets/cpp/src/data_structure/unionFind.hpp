#ifndef SRC_DATA_STRUCTURE_UNIONFIND_HPP_
#define SRC_DATA_STRUCTURE_UNIONFIND_HPP_

#include <iostream>
#include <vector>

using namespace std;

class UnionFind {
 private:
     vector<int> root;
     vector<int> rank;

 public:
     explicit UnionFind(int n) {
         root.resize(n);
         rank.resize(n, 0);
         for (int i = 0; i < n; ++i) {
             root[i] = i;
         }
     }

     int find(int i) {
         if (root[i] == i) { return i; }
         return root[i] = find(root[i]);
     }

     // false: already joined; true: joined succuessfully
     bool join(int i, int j) {
         int rooti = find(i), rootj = find(j);
         if (rooti == rootj) { return false; }

         if (rank[rooti] > rank[rootj]) {
             root[rootj] = rooti;
         } else if (rank[rooti] < rank[rootj]) {
             root[rooti] = rootj;
         } else {
             root[rooti] = rootj;
             rank[rootj]++;
         }
         return true;
     }
};

#endif  //  SRC_DATA_STRUCTURE_UNIONFIND_HPP_
