package controllers

type Result struct {
	Verdict    bool
	Similarity float32
}

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

func levenshteinDistance(text, pattern string) int {
	//return levenshtein distance between text and pattern

	n := len(text)
	m := len(pattern)
	d := make([][]int, n+1)
	for i := range d {
		d[i] = make([]int, m+1)
	}
	for i := 0; i <= n; i++ {
		d[i][0] = i
	}
	for j := 0; j <= m; j++ {
		d[0][j] = j
	}
	for j := 1; j <= m; j++ {
		for i := 1; i <= n; i++ {
			if text[i-1] == pattern[j-1] {
				d[i][j] = d[i-1][j-1]
			} else {
				d[i][j] = min(d[i-1][j]+1, min(d[i][j-1]+1, d[i-1][j-1]+1))
			}
		}
	}
	return d[n][m]
}

func divideSubstring(text, pattern string) []string {
	//find all substrings of text with length of pattern

	n := len(text)
	m := len(pattern)
	res := make([]string, n-m+1)
	if n < m {
		return []string{}
	} else {
		for i := 0; i <= n-m; i++ {
			res = append(res, text[i:i+m])
		}
		return res
	}
}

func findSimilarity(text, pattern string) float32 {
	// find all distance between substrings of text with pattern and return shortest distance
	substrings := divideSubstring(text, pattern)
	minDistance := len(pattern)
	for i := 0; i < len(substrings); i++ {
		distance := levenshteinDistance(substrings[i], pattern)
		if distance < minDistance {
			minDistance = distance
		}
	}
	return float32((len(pattern) - minDistance)) / float32(len(pattern))
}

func cekDNA(namapenyakit string, pattern string, method string) Result {
	patternPenyakit := getPenyakit(namapenyakit)
	verdict := false

	if method == "KMP" {
		verdict = KMP(patternPenyakit.SequenceDNA, pattern)
	} else {
		verdict = bmMatch(patternPenyakit.SequenceDNA, pattern)
	}

	similarity := findSimilarity(pattern, patternPenyakit.SequenceDNA)

	return Result{
		Verdict:    verdict,
		Similarity: similarities * 100,
	}
}
