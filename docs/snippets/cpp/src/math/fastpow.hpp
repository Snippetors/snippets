#ifndef SRC_MATH_FASTPOW_HPP_
#define SRC_MATH_FASTPOW_HPP_

#include <iostream>
using namespace std;
using ll = int64_t;
ll M = 1e9 + 7;

ll fastpow(ll x, ll n) {
    ll res = 1;
    while (n) {
        if (n & 1 == 1) {
            res *= x;
            res %= M;
        }
        x = (x * x) % M;
        n /= 2;
    }
    return res;
}

#endif  // SRC_MATH_FASTPOW_HPP_
