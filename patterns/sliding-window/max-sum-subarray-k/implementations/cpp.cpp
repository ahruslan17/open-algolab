#include <algorithm>
#include <optional>
#include <stdexcept>
#include <vector>

using std::invalid_argument;
using std::max;
using std::optional;
using std::vector;

int maxSumSubarrayK(const vector<int>& nums, int k) {
    if (k <= 0 || k > static_cast<int>(nums.size())) {
        throw invalid_argument("invalid window size");
    }

    int windowSum = 0;
    optional<int> best;
    int left = 0;

    for (int right = 0; right < static_cast<int>(nums.size()); ++right) {
        windowSum += nums[right];

        if (right - left + 1 == k) {
            best = best ? max(*best, windowSum) : windowSum;
            windowSum -= nums[left];
            ++left;
        }
    }

    return *best;
}
