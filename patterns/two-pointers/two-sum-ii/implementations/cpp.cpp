#include <stdexcept>
#include <vector>

using std::invalid_argument;
using std::vector;

vector<int> twoSumII(const vector<int>& numbers, int target) {
    int left = 0;
    int right = static_cast<int>(numbers.size()) - 1;

    while (left < right) {
        int currentSum = numbers[left] + numbers[right];

        if (currentSum == target) {
            return {left + 1, right + 1};
        }

        if (currentSum < target) {
            ++left;
        } else {
            --right;
        }
    }

    throw invalid_argument("no pair adds up to target");
}
