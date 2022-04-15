package main

func max(x, y int) int {
	if x < y {
		return y
	}
	return x
}

// Min returns the smaller of x or y.
func min(x, y int) int {
	if x > y {
		return y
	}
	return x
}

func computeFail(pattern string) []int {
	fail := make([]int, len(pattern))
	j := 0
	for i := 1; i < len(pattern); i++ {
		for j > 0 && pattern[i] != pattern[j] {
			j = fail[j-1]
		}
		if pattern[i] == pattern[j] {
			j++
		}
		fail[i] = j
	}
	return fail
}

func KMP(pattern string, text string) bool {
	fail := computeFail(pattern)
	i, j := 0, 0
	for i < len(text) {
		if text[i] == pattern[j] {
			i++
			j++
		}
		if j == len(pattern)-1 {
			return true
		}
		if i < len(text) && text[i] != pattern[j] {
			if j > 0 {
				j = fail[j-1]
			} else {
				i++
			}
		}
	}
	return false
}

func buildLast(pattern string) []int {
	//return array storing index of last occurence of each ASCII character in pattern

	last := make([]int, 256)
	for i := range last {
		last[i] = -1
	}
	for i := 0; i < len(pattern); i++ {
		last[pattern[i]] = i
	}
	return last
}

func bmMatch(pattern string, text string) bool {
	//return true if pattern is found in text

	n := len(text)
	m := len(pattern)
	last := buildLast(pattern)
	i := m - 1
	if i > n-1 {
		return false
	}

	j := m - 1
	for {
		if pattern[j] == text[i] {
			if j == 0 {
				return true
			}
			i--
			j--
		} else {
			x := last[text[i]]
			i = i + m - min(j, 1+x)
			j = m - 1
		}
		if !(i < n-1) {
			break
		}
	}
	return false
}
