export const LANGUAGES = [
    { value: 'python3',    label: 'Python3'     },
    { value: 'javascript', label: 'JavaScript'  },
    { value: 'typescript', label: 'TypeScript'  },
    { value: 'java',       label: 'Java'        },
    { value: 'cpp',        label: 'C++'         },
    { value: 'go',         label: 'Go'          },
    { value: 'rust',       label: 'Rust'        },
  ];
  
  export interface TestCase {
    id: string;
    label: string;
    inputs: { name: string; value: string }[];
  }
  
  export const TEST_CASES: TestCase[] = [
    {
      id: 'case1',
      label: 'Case 1',
      inputs: [
        { name: 'nums',   value: '[2,7,11,15]' },
        { name: 'target', value: '9'           },
      ],
    },
    {
      id: 'case2',
      label: 'Case 2',
      inputs: [
        { name: 'nums',   value: '[3,2,4]' },
        { name: 'target', value: '6'       },
      ],
    },
    {
      id: 'case3',
      label: 'Case 3',
      inputs: [
        { name: 'nums',   value: '[3,3]' },
        { name: 'target', value: '6'     },
      ],
    },
  ];
  
  export const STARTER_CODE: Record<string, string> = {
    python3: `class Solution:
      def twoSum(self, nums: List[int], target: int) -> List[int]:
          # Your implementation here
          lookup = {}
          for i, n in enumerate(nums):
              diff = target - n
              if diff in lookup:
                  return [lookup[diff], i]
              lookup[n] = i
          return []`,
    javascript: `/**
   * @param {number[]} nums
   * @param {number} target
   * @return {number[]}
   */
  var twoSum = function(nums, target) {
      const lookup = {};
      for (let i = 0; i < nums.length; i++) {
          const diff = target - nums[i];
          if (diff in lookup) return [lookup[diff], i];
          lookup[nums[i]] = i;
      }
      return [];
  };`,
  };
  