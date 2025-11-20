def parseInput():
    f = open("./day05input.txt", "r")
    lines = f.readlines()
    splitter = lines.index("\n")
    rules = lines[0:splitter]
    pages = lines[splitter + 1 : len(lines)]
    rules = [rule.strip() for rule in rules]
    pages = [page.strip("\n") for page in pages]
    pages = [list(map(int, page.split(","))) for page in pages]
    return [rules, pages]

def p1(input):
    rules = input[0]
    pages = input[1]
    middleSum = 0
    correct = []
    for i in range(len(pages)):
        inOrder = True
        for j in range(len(rules)):
            leftnum = int(rules[j].split("|")[0])
            rightnum = int(rules[j].split("|")[1])
            if leftnum in pages[i] and rightnum in pages[i]:
                if pages[i].index(leftnum) > pages[i].index(rightnum):
                    inOrder = False
        if inOrder:
            correct.append(pages[i])
    for numList in correct:
        middleSum += numList[len(numList) // 2]
    return middleSum

print(p1(parseInput()))

