#ifndef SRC_MISC_QUICKPOW_HPP_
#define SRC_MISC_QUICKPOW_HPP_

#include <iostream>
using namespace std;
using ll = long long;
ll M = 1e9 + 7;

ll quickpow(ll x, ll n) {
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


#endif
