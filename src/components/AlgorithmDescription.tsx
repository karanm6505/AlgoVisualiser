import React from 'react';
import { AlgorithmType } from '@/types';

interface AlgorithmDescriptionProps {
  algorithm: AlgorithmType;
}

const AlgorithmDescription: React.FC<AlgorithmDescriptionProps> = ({ algorithm }) => {
  const descriptions: Record<AlgorithmType, string> = {
    'bubble': `
# Bubble Sort

## Overview
Bubble Sort is one of the simplest sorting algorithms that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

## How It Works
1. Start at the beginning of an array
2. Compare the first two elements. If the first is greater than the second, swap them
3. Move to the next pair of elements and repeat step 2
4. Continue until the end of the array is reached
5. Repeat steps 1-4 until no swaps are needed

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n) - when the array is already sorted
  - Average Case: O(n²)
  - Worst Case: O(n²)
- **Space Complexity**: O(1) - only requires a constant amount of additional space
- **Stability**: Stable - equal elements maintain their relative order

## Advantages
- Simple implementation
- Performs well on small datasets
- Minimal space requirements

## Disadvantages
- Very inefficient for large lists
- Performance degrades quickly as the size of the input grows

## Pseudocode
\`\`\`
procedure bubbleSort(A: list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure
\`\`\`
`,

    'selection': `
# Selection Sort

## Overview
Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist.

## How It Works
1. Find the minimum element in the unsorted sublist
2. Swap it with the leftmost element of the unsorted sublist
3. Move the boundary of the sorted sublist one element to the right
4. Repeat until the entire list is sorted

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n²)
  - Average Case: O(n²)
  - Worst Case: O(n²)
- **Space Complexity**: O(1) - in-place sorting algorithm
- **Stability**: Unstable - equal elements may change their relative order

## Advantages
- Simple implementation
- Performs well on small arrays
- Minimizes the number of swaps (O(n) swaps)

## Disadvantages
- Inefficient on large lists
- Always performs O(n²) comparisons, even if the array is sorted

## Pseudocode
\`\`\`
procedure selectionSort(A: list of sortable items)
    n := length(A)
    for i := 0 to n-1 do
        min_index := i
        for j := i+1 to n-1 do
            if A[j] < A[min_index] then
                min_index := j
            end if
        end for
        if min_index ≠ i then
            swap A[i] and A[min_index]
        end if
    end for
end procedure
\`\`\`
`,

    'insertion': `
# Insertion Sort

## Overview
Insertion Sort builds the final sorted array one item at a time. It's much less efficient on large lists than more advanced algorithms like Quick Sort, Heap Sort, or Merge Sort.

## How It Works
1. Start with the second element (assume the first element is sorted)
2. Compare the current element with the previous elements
3. If the previous elements are greater, move them up to make space for the current element
4. Insert the current element in its correct position
5. Repeat until the entire array is sorted

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n) - when the array is already sorted
  - Average Case: O(n²)
  - Worst Case: O(n²) - when the array is sorted in reverse order
- **Space Complexity**: O(1) - in-place sorting algorithm
- **Stability**: Stable - equal elements maintain their relative order

## Advantages
- Simple implementation
- Efficient for small data sets
- More efficient than Selection Sort and Bubble Sort
- Works well with nearly sorted arrays
- Online algorithm (can sort as it receives input)

## Disadvantages
- Inefficient for large data sets

## Pseudocode
\`\`\`
procedure insertionSort(A: list of sortable items)
    n := length(A)
    for i := 1 to n-1 do
        key := A[i]
        j := i-1
        while j >= 0 and A[j] > key do
            A[j+1] := A[j]
            j := j-1
        end while
        A[j+1] := key
    end for
end procedure
\`\`\`
`,

    'merge': `
# Merge Sort

## Overview
Merge Sort is an efficient, stable, divide-and-conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves.

## How It Works
1. Divide the unsorted list into n sublists, each containing one element
2. Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n log n)
  - Average Case: O(n log n)
  - Worst Case: O(n log n)
- **Space Complexity**: O(n) - requires additional space proportional to the size of the input
- **Stability**: Stable - equal elements maintain their relative order

## Advantages
- Guaranteed O(n log n) performance regardless of input
- Stable sorting algorithm
- Works well for large datasets

## Disadvantages
- Requires additional O(n) space
- Slower for small arrays compared to insertion sort
- Not an in-place algorithm

## Pseudocode
\`\`\`
procedure mergeSort(A: list of sortable items)
    if length(A) <= 1 then
        return A
    end if
    
    mid := length(A) / 2
    left := A[0...mid-1]
    right := A[mid...length(A)-1]
    
    mergeSort(left)
    mergeSort(right)
    merge(A, left, right)
end procedure

procedure merge(A: list, left: list, right: list)
    i := 0, j := 0, k := 0
    
    while i < length(left) and j < length(right) do
        if left[i] <= right[j] then
            A[k] := left[i]
            i := i + 1
        else
            A[k] := right[j]
            j := j + 1
        end if
        k := k + 1
    end while
    
    while i < length(left) do
        A[k] := left[i]
        i := i + 1
        k := k + 1
    end while
    
    while j < length(right) do
        A[k] := right[j]
        j := j + 1
        k := k + 1
    end while
end procedure
\`\`\`
`,

    'quick': `
# Quick Sort

## Overview
Quick Sort is a highly efficient divide-and-conquer sorting algorithm that selects a 'pivot' element and partitions the array around it.

## How It Works
1. Select a pivot element from the array
2. Partition the array so that all elements less than the pivot come before it, and all elements greater than the pivot come after it
3. Recursively apply the above steps to the sub-arrays formed on either side of the pivot

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n log n)
  - Average Case: O(n log n)
  - Worst Case: O(n²) - when the pivot selection is poor (e.g., always selecting the smallest or largest element)
- **Space Complexity**: O(log n) - due to recursive calls on the stack
- **Stability**: Unstable - equal elements may change their relative order

## Advantages
- Generally very fast in practice
- In-place sorting (requires only a small amount of additional storage)
- Good cache locality

## Disadvantages
- Worst-case performance is O(n²)
- Not stable
- Careful pivot selection is required for optimal performance

## Pseudocode
\`\`\`
procedure quickSort(A: list of sortable items, low: int, high: int)
    if low < high then
        p := partition(A, low, high)
        quickSort(A, low, p - 1)
        quickSort(A, p + 1, high)
    end if
end procedure

procedure partition(A: list of sortable items, low: int, high: int) returns int
    pivot := A[high]
    i := low - 1
    
    for j := low to high - 1 do
        if A[j] <= pivot then
            i := i + 1
            swap A[i] and A[j]
        end if
    end for
    
    swap A[i + 1] and A[high]
    return i + 1
end procedure
\`\`\`
`,

    'heap': `
# Heap Sort

## Overview
Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and inserting it into the sorted region.

## How It Works
1. Build a max heap from the input data
2. Swap the root (maximum value) with the last element of the heap
3. Reduce the heap size by 1 and heapify the root
4. Repeat steps 2-3 until the heap size is 1

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n log n)
  - Average Case: O(n log n)
  - Worst Case: O(n log n)
- **Space Complexity**: O(1) - in-place sorting algorithm
- **Stability**: Unstable - equal elements may change their relative order

## Advantages
- Efficient time complexity
- In-place sorting
- No quadratic worst-case scenario like Quick Sort

## Disadvantages
- Not stable
- Slower than Quick Sort in practice
- More complex implementation than some other algorithms

## Pseudocode
\`\`\`
procedure heapSort(A: list of sortable items)
    n := length(A)
    
    // Build max heap
    for i := n/2-1 down to 0 do
        heapify(A, n, i)
    end for
    
    // Extract elements from heap one by one
    for i := n-1 down to 0 do
        swap A[0] with A[i]
        heapify(A, i, 0)
    end for
end procedure

procedure heapify(A: list of sortable items, n: int, i: int)
    largest := i
    left := 2*i + 1
    right := 2*i + 2
    
    if left < n and A[left] > A[largest] then
        largest := left
    end if
    
    if right < n and A[right] > A[largest] then
        largest := right
    end if
    
    if largest ≠ i then
        swap A[i] and A[largest]
        heapify(A, n, largest)
    end if
end procedure
\`\`\`
`,

    'radix': `
# Radix Sort

## Overview
Radix Sort is a non-comparative sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same position and value.

## How It Works
1. Find the maximum number to determine the number of digits
2. Do counting sort for every digit from the least significant digit to the most significant digit

## Characteristics
- **Time Complexity**: 
  - Best Case: O(nk) where n is the number of elements and k is the number of digits
  - Average Case: O(nk)
  - Worst Case: O(nk)
- **Space Complexity**: O(n+k) where k is the range of keys (e.g., 10 for decimal digits)
- **Stability**: Stable - equal elements maintain their relative order

## Advantages
- Linear time complexity when k is fixed
- Works well when the range of keys is not much larger than the number of elements
- Stable sorting algorithm

## Disadvantages
- Uses more space compared to comparison-based algorithms
- Less efficient when k is large
- Only works with integers or strings

## Pseudocode
\`\`\`
procedure radixSort(A: list of integers)
    max := findMax(A)
    
    // Do counting sort for every digit
    for exp := 1 while max/exp > 0 do
        countingSortByDigit(A, exp)
        exp := exp * 10
    end for
end procedure

procedure countingSortByDigit(A: list of integers, exp: int)
    n := length(A)
    output[n] := new array
    count[10] := new array initialized to 0
    
    // Count occurrences of each digit
    for i := 0 to n-1 do
        digit := (A[i] / exp) mod 10
        count[digit] := count[digit] + 1
    end for
    
    // Change count to contain actual position of this digit in output
    for i := 1 to 9 do
        count[i] := count[i] + count[i-1]
    end for
    
    // Build the output array
    for i := n-1 down to 0 do
        digit := (A[i] / exp) mod 10
        output[count[digit] - 1] := A[i]
        count[digit] := count[digit] - 1
    end for
    
    // Copy output array to A
    for i := 0 to n-1 do
        A[i] := output[i]
    end for
end procedure
\`\`\`
`,

    'shell': `
# Shell Sort

## Overview
Shell Sort is an optimization of insertion sort that allows the exchange of items that are far apart. The idea is to arrange the list of elements so that, starting anywhere, considering every hth element gives a sorted list.

## How It Works
1. Start with a gap value h
2. Perform an insertion sort for every h elements
3. Reduce the gap value and repeat until the gap is 1
4. When the gap is 1, it's equivalent to a standard insertion sort

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n log n)
  - Average Case: O(n log²n) or O(n^(3/2)) depending on the gap sequence
  - Worst Case: O(n²)
- **Space Complexity**: O(1) - in-place sorting algorithm
- **Stability**: Unstable - equal elements may change their relative order

## Advantages
- More efficient than insertion sort for medium to large lists
- Good for partially sorted arrays
- Simple implementation

## Disadvantages
- Complex time complexity analysis
- Not stable
- Performance depends heavily on the gap sequence chosen

## Pseudocode
\`\`\`
procedure shellSort(A: list of sortable items)
    n := length(A)
    
    // Start with a large gap and reduce it
    gap := n/2
    
    while gap > 0 do
        for i := gap to n-1 do
            // Save A[i] in temp and make a hole at position i
            temp := A[i]
            
            // Shift earlier gap-sorted elements up until the correct location for A[i] is found
            j := i
            while j >= gap and A[j-gap] > temp do
                A[j] := A[j-gap]
                j := j - gap
            end while
            
            // Put temp (the original A[i]) in its correct location
            A[j] := temp
        end for
        
        gap := gap / 2
    end while
end procedure
\`\`\`
`,

    'cocktail': `
# Cocktail Sort

## Overview
Cocktail Sort, also known as bidirectional bubble sort, is a variation of bubble sort that sorts in both directions on each pass through the list.

## How It Works
1. Traverse the list from left to right, similar to bubble sort
2. After reaching the end, traverse back from right to left
3. Repeat until the list is sorted

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n) - when the array is already sorted
  - Average Case: O(n²)
  - Worst Case: O(n²)
- **Space Complexity**: O(1) - in-place sorting algorithm
- **Stability**: Stable - equal elements maintain their relative order

## Advantages
- Slightly more efficient than bubble sort
- Can identify "turtles" (small values near the end) more quickly than bubble sort

## Disadvantages
- Still inefficient for large lists
- Generally outperformed by more advanced algorithms

## Pseudocode
\`\`\`
procedure cocktailSort(A: list of sortable items)
    n := length(A)
    swapped := true
    start := 0
    end := n - 1
    
    while swapped do
        swapped := false
        
        // Forward pass (left to right)
        for i := start to end-1 do
            if A[i] > A[i+1] then
                swap(A[i], A[i+1])
                swapped := true
            end if
        end for
        
        if not swapped then
            break
        end if
        
        swapped := false
        end := end - 1
        
        // Backward pass (right to left)
        for i := end-1 down to start do
            if A[i] > A[i+1] then
                swap(A[i], A[i+1])
                swapped := true
            end if
        end for
        
        start := start + 1
    end while
end procedure
\`\`\`
`,

    'counting': `
# Counting Sort

## Overview
Counting Sort is a non-comparative sorting algorithm that works by counting the number of objects that have distinct key values, and using arithmetic to determine the positions of each key value in the output sequence.

## How It Works
1. Create a counting array with a size equal to the range of input values
2. Count the occurrences of each value in the input array
3. Modify the counting array to store the position of each element in the output array
4. Build the output array using the counting array

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n+k) where n is the number of elements and k is the range of input
  - Average Case: O(n+k)
  - Worst Case: O(n+k)
- **Space Complexity**: O(n+k)
- **Stability**: Stable - equal elements maintain their relative order

## Advantages
- Linear time complexity when k is fixed
- Excellent for small integers with limited range
- Stable sorting algorithm

## Disadvantages
- Not suitable when the range of elements is large compared to the number of elements
- Requires additional space proportional to the range of keys

## Pseudocode
\`\`\`
procedure countingSort(A: list of integers, max: int)
    n := length(A)
    output[n] := new array
    count[max+1] := new array initialized to 0
    
    // Count occurrences
    for i := 0 to n-1 do
        count[A[i]] := count[A[i]] + 1
    end for
    
    // Modify count to store position of each element in output
    for i := 1 to max do
        count[i] := count[i] + count[i-1]
    end for
    
    // Build output array
    for i := n-1 down to 0 do
        output[count[A[i]]-1] := A[i]
        count[A[i]] := count[A[i]] - 1
    end for
    
    // Copy output array to A
    for i := 0 to n-1 do
        A[i] := output[i]
    end for
end procedure
\`\`\`
`,

    'bucket': `
# Bucket Sort

## Overview
Bucket Sort is a distribution sort that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sort algorithm.

## How It Works
1. Create n empty buckets
2. Distribute the elements of the array into buckets based on their values
3. Sort each non-empty bucket (using another sorting algorithm or recursively using bucket sort)
4. Concatenate all sorted buckets in order

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n+k) where n is the number of elements and k is the number of buckets
  - Average Case: O(n+k) when elements are uniformly distributed
  - Worst Case: O(n²) when all elements are placed in a single bucket
- **Space Complexity**: O(n+k)
- **Stability**: Stable - equal elements maintain their relative order (if the sorting within buckets is stable)

## Advantages
- Can be very fast when input is uniformly distributed
- Linear time complexity in the average case
- Simple implementation

## Disadvantages
- Requires additional memory for buckets
- Performance degrades when elements are not uniformly distributed
- Choosing the right number of buckets can be challenging

## Pseudocode
\`\`\`
procedure bucketSort(A: list of values in the range 0.0-1.0)
    n := length(A)
    buckets[n] := create n empty buckets
    
    // Distribute elements into buckets
    for i := 0 to n-1 do
        idx := floor(n * A[i])
        buckets[idx].append(A[i])
    end for
    
    // Sort individual buckets
    for i := 0 to n-1 do
        sort(buckets[i])
    end for
    
    // Concatenate all buckets
    index := 0
    for i := 0 to n-1 do
        for j := 0 to length(buckets[i])-1 do
            A[index] := buckets[i][j]
            index := index + 1
        end for
    end for
end procedure
\`\`\`
`,

    'bogo': `
# Bogo Sort

## Overview
Bogo Sort (also known as permutation sort, stupid sort, or monkey sort) is a highly inefficient sorting algorithm based on the generate-and-test paradigm. It works by randomly permuting the input until it happens to be sorted.

## How It Works
1. Check if the list is sorted
2. If not, randomly rearrange the elements
3. Repeat until the list is sorted

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n) - if the list is already sorted
  - Average Case: O(n × n!) - where n! is the factorial of n
  - Worst Case: Unbounded (may never finish)
- **Space Complexity**: O(1) - in-place sorting algorithm
- **Stability**: Unstable - equal elements may change their relative order

## Advantages
- Simple to implement
- Educational value in demonstrating what not to do

## Disadvantages
- Extremely inefficient
- Not suitable for practical use
- Has a non-zero probability of never terminating

## Pseudocode
\`\`\`
procedure bogoSort(A: list of sortable items)
    while not isSorted(A) do
        shuffle(A)
    end while
end procedure

procedure isSorted(A: list of sortable items) returns boolean
    for i := 1 to length(A)-1 do
        if A[i-1] > A[i] then
            return false
        end if
    end for
    return true
end procedure

procedure shuffle(A: list of sortable items)
    n := length(A)
    for i := 0 to n-1 do
        j := random integer in range [0, n-1]
        swap A[i] and A[j]
    end for
end procedure
\`\`\`
`,

    'linear': `
# Linear Search

## Overview
Linear Search is the most straightforward searching algorithm. It sequentially checks each element in a list until it finds the target value or reaches the end of the list.

## How It Works
1. Start from the leftmost element of the array
2. One by one compare the target value with each element of the array
3. If the element matches the target value, return its index
4. If the target is not found, return -1 (or appropriate value to indicate "not found")

## Characteristics
- **Time Complexity**: 
  - Best Case: O(1) - when the target is at the first position
  - Average Case: O(n) - when the target is in the middle or distributed randomly
  - Worst Case: O(n) - when the target is at the last position or not present
- **Space Complexity**: O(1) - only requires a constant amount of space
- **Requirements**: None - works on any array (sorted or unsorted)

## Advantages
- Simple to implement and understand
- No preprocessing required
- Works on unsorted arrays
- Efficient for small datasets

## Disadvantages
- Inefficient for large datasets
- Much slower than binary search for sorted arrays

## Pseudocode
\`\`\`
procedure linearSearch(array, target)
    for i = 0 to length(array) - 1 do
        if array[i] equals target then
            return i  // Target found at index i
        end if
    end for
    return -1  // Target not found in array
end procedure
\`\`\`
`,

    'binary': `
# Binary Search

## Overview
Binary Search is an efficient divide-and-conquer search algorithm that works on sorted arrays. It repeatedly divides the search interval in half, eliminating half of the remaining elements at each step.

## How It Works
1. Start with the middle element of the sorted array
2. If the target value matches the middle element, return its index
3. If the target value is less than the middle element, search the left half of the array
4. If the target value is greater than the middle element, search the right half of the array
5. Repeat steps 1-4 until the element is found or the search interval is empty

## Characteristics
- **Time Complexity**: 
  - Best Case: O(1) - when the target is at the middle position
  - Average Case: O(log n) - because the search space is halved at each step
  - Worst Case: O(log n) - when the target is at an extreme end or not present
- **Space Complexity**: 
  - O(1) for iterative implementation
  - O(log n) for recursive implementation (due to call stack)
- **Requirements**: The array must be sorted before applying binary search

## Advantages
- Very efficient for searching large sorted datasets
- Logarithmic time complexity makes it much faster than linear search for large arrays
- Well-suited for datasets too large to fit in memory

## Disadvantages
- Only works on sorted arrays
- Not efficient for small arrays (overhead might exceed linear search benefits)
- May be complex to implement correctly (off-by-one errors are common)

## Pseudocode
\`\`\`
procedure binarySearch(array, target)
    left = 0
    right = length(array) - 1
    while left <= right do
        middle = floor((left + right) / 2)
        if array[middle] < target then
            left = middle + 1
        else if array[middle] > target then
            right = middle - 1
        else
            return middle  // Target found at index middle
        end if
    end while
    return -1  // Target not found
end procedure
\`\`\`
`,

    'ternary': `
# Ternary Search

## Overview
Ternary Search is a divide-and-conquer algorithm that divides the sorted array into three parts instead of two as in binary search. It determines which of the three parts the target value may be in.

## How It Works
1. Divide the sorted array into three equal parts by computing two mid-points
2. Check if the target value is at either of the mid-points
3. If the target is less than the first mid-point, search in the first third
4. If the target is greater than the second mid-point, search in the last third
5. Otherwise, search in the middle third
6. Repeat until the element is found or the search interval becomes empty

## Characteristics
- **Time Complexity**: 
  - Best Case: O(1) - when the target is at one of the mid-points
  - Average Case: O(log₃ n) - because the search space is reduced to 1/3 at each step
  - Worst Case: O(log₃ n)
- **Space Complexity**: 
  - O(1) for iterative implementation
  - O(log₃ n) for recursive implementation (due to call stack)
- **Requirements**: The array must be sorted

## Advantages
- Divides the array into more parts than binary search
- Can be faster than binary search in theory (fewer comparisons in the best case)

## Disadvantages
- In practice, often slower than binary search due to more comparisons per iteration
- Only works on sorted arrays
- More complex to implement than binary search

## Pseudocode
\`\`\`
procedure ternarySearch(array, target, left, right)
    if right >= left then
        // Find the two mid points
        mid1 = left + (right - left) / 3
        mid2 = right - (right - left) / 3
        
        if array[mid1] == target then
            return mid1  // Target found at first mid-point
        end if
        
        if array[mid2] == target then
            return mid2  // Target found at second mid-point
        end if
        
        if target < array[mid1] then
            // Target is in the first third
            return ternarySearch(array, target, left, mid1 - 1)
        else if target > array[mid2] then
            // Target is in the last third
            return ternarySearch(array, target, mid2 + 1, right)
        else
            // Target is in the middle third
            return ternarySearch(array, target, mid1 + 1, mid2 - 1)
        end if
    end if
    
    return -1  // Target not found
end procedure
\`\`\`
`,

    'naive': `
# Naive String Matching

## Overview
The Naive String Matching algorithm, also known as the Brute Force algorithm, is the simplest approach to finding a pattern within a text. It checks for the pattern at every possible position in the text.

## How It Works
1. Slide the pattern over the text one by one
2. At each position, check if the pattern matches the text character by character
3. If a complete match is found, record the starting position
4. Continue until the end of the text is reached

## Characteristics
- **Time Complexity**: 
  - Best Case: O(m) - when first character mismatch occurs at each attempt (m = pattern length)
  - Average Case: O(m × (n-m+1)) - where n is text length and m is pattern length
  - Worst Case: O(m × n) - when each comparison requires full pattern comparison
- **Space Complexity**: O(1) - constant extra space
- **Requirements**: None - can be applied to any text and pattern

## Advantages
- Simple to understand and implement
- No preprocessing required
- Works well for small texts or patterns
- Doesn't require additional memory

## Disadvantages
- Very inefficient for large texts or patterns
- Performs redundant comparisons
- Doesn't take advantage of previous match information

## Pseudocode
\`\`\`
procedure naiveStringMatch(text, pattern)
    n = length(text)
    m = length(pattern)
    matches = empty list
    
    for i = 0 to n-m do
        match = true
        for j = 0 to m-1 do
            if text[i+j] != pattern[j] then
                match = false
                break
            end if
        end for
        
        if match then
            add i to matches
        end if
    end for
    
    return matches
end procedure
\`\`\`
`,

    'horspool': `
# Horspool's Algorithm

## Overview
Horspool's algorithm is a simplified variant of the Boyer-Moore string matching algorithm. It uses only the bad character rule for shifting the pattern during the search process, making it more efficient than the naive approach.

## How It Works
1. Preprocess the pattern to create a "bad character" shift table
2. Compare the pattern with the text from right to left
3. If a mismatch occurs, shift the pattern according to the bad character rule
4. Repeat until the pattern is found or the end of the text is reached

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n/m) - sublinear when many shifts occur (n = text length, m = pattern length)
  - Average Case: O(n) - typically much better than the naive approach
  - Worst Case: O(m × n) - when many comparisons and few shifts occur
- **Space Complexity**: O(k) - where k is the size of the alphabet
- **Requirements**: None - applicable to any text and pattern

## Advantages
- Much faster than naive string matching in practice
- Simpler to implement than the full Boyer-Moore algorithm
- Performs well with large alphabets
- Makes larger shifts than many other algorithms

## Disadvantages
- Not as efficient as full Boyer-Moore for certain patterns
- Preprocessing step required
- Performance depends on pattern characteristics

## Preprocessor Pseudocode
\`\`\`
procedure buildShiftTable(pattern)
    m = length(pattern)
    table = new table with default value m
    
    for i = 0 to m-2 do
        table[pattern[i]] = m - 1 - i
    end for
    
    return table
end procedure
\`\`\`

## Search Pseudocode
\`\`\`
procedure horspoolSearch(text, pattern)
    n = length(text)
    m = length(pattern)
    if m = 0 then return [0]
    if m > n then return []
    
    shiftTable = buildShiftTable(pattern)
    matches = empty list
    i = 0
    
    while i <= n-m do
        j = m - 1
        while j >= 0 and pattern[j] = text[i+j] do
            j = j - 1
        end while
        
        if j < 0 then
            add i to matches
            i = i + 1
        else
            i = i + shiftTable[text[i+m-1]] or m if character not in table
        end if
    end while
    
    return matches
end procedure
\`\`\`
`,

    'boyer-moore': `
# Boyer-Moore Algorithm

## Overview
The Boyer-Moore algorithm is one of the most efficient string matching algorithms, using two key rules: the bad character rule and the good suffix rule. It scans the characters of the pattern from right to left while shifting the pattern from left to right.

## How It Works
1. Preprocess the pattern to create:
   - A bad character table: indicates how far to shift when a mismatch occurs
   - A good suffix table: allows skipping alignments that cannot match based on previous partial matches
2. Compare the pattern with the text from right to left
3. When a mismatch occurs, shift the pattern by the maximum amount suggested by either rule
4. Repeat until the pattern is found or the end of text is reached

## Characteristics
- **Time Complexity**: 
  - Best Case: O(n/m) - sublinear in favorable cases (n = text length, m = pattern length)
  - Average Case: O(n) - typically much better than O(n)
  - Worst Case: O(m × n) - when many matches occur
- **Space Complexity**: O(k + m) - where k is the alphabet size and m is pattern length
- **Requirements**: None - applicable to any text and pattern

## Advantages
- Often outperforms other string matching algorithms in practice
- Skips large portions of the text, making it very efficient
- Gets faster as pattern length increases
- Excellent for patterns with high variability at the end

## Disadvantages
- Complex to implement fully (especially the good suffix rule)
- Requires preprocessing time
- More overhead for short patterns or small alphabets

## Bad Character Rule Pseudocode
\`\`\`
procedure buildBadCharTable(pattern)
    m = length(pattern)
    table = new table with default value m
    
    for i = 0 to m-2 do
        table[pattern[i]] = m - 1 - i
    end for
    
    return table
end procedure
\`\`\`

## Search Pseudocode (Simplified)
\`\`\`
procedure boyerMooreSearch(text, pattern)
    n = length(text)
    m = length(pattern)
    if m = 0 then return [0]
    if m > n then return []
    
    badCharTable = buildBadCharTable(pattern)
    // Good suffix table construction omitted for brevity
    
    matches = empty list
    shift = 0
    
    while shift <= n - m do
        j = m - 1
        
        while j >= 0 and pattern[j] = text[shift + j] do
            j = j - 1
        end while
        
        if j < 0 then
            add shift to matches
            // Apply good suffix rule for shift
            shift = shift + 1
        else
            // Apply bad character rule
            badCharShift = j - badCharTable[text[shift + j]] or j + 1 if not in table
            // goodSuffixShift calculation omitted
            shift = shift + max(badCharShift, goodSuffixShift)
        end if
    end while
    
    return matches
end procedure
\`\`\`
`
  };

  return (
    <div className="algorithm-description">
      <div dangerouslySetInnerHTML={{ __html: markdownToHtml(descriptions[algorithm]) }} />
    </div>
  );
};

// Enhanced markdown to HTML converter
const markdownToHtml = (markdown: string): string => {
  const html = markdown
    // Headers with proper styling
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 text-primary">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mt-8 mb-3 pb-2 border-b">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mt-6 mb-2">$1</h3>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Lists with proper styling
    .replace(/^(\d+\. )(.*$)/gm, '<li class="ml-5 mb-2">$2</li>')
    .replace(/^\- (.*$)/gm, '<li class="ml-5 mb-2 list-disc">$1</li>')
    // Ordered and unordered lists
    .replace(/<li class="ml-5 mb-2">/g, '<ol class="list-decimal my-4">\n<li class="ml-5 mb-2">')
    .replace(/<\/li>\s*(?!<li)/g, '</li>\n</ol>')
    .replace(/<li class="ml-5 mb-2 list-disc">/g, '<ul class="list-disc my-4">\n<li class="ml-5 mb-2">')
    .replace(/<\/li>\s*(?!<li)/g, '</li>\n</ul>')
    // Fix duplicate list close tags
    .replace(/<\/ol>\s*<\/ol>/g, '</ol>')
    .replace(/<\/ul>\s*<\/ul>/g, '</ul>')
    // Code blocks with syntax highlighting styling
    .replace(/```([\s\S]*?)```/g, '<pre><code class="language-javascript">$1</code></pre>')
    // Paragraphs
    .replace(/^(?!<[hl]).+/gm, function(match) {
      return match.trim() ? `<p>${match}</p>` : '';
    });
  
  return html;
};

export default AlgorithmDescription;
