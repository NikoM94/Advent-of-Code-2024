def parseInput():
    f = open("./day05input.txt", "r")
    lines = f.readlines()
    splitter = lines.index("\n")
    rules = lines[0:splitter]
    pages = lines[splitter + 1:len(lines)]
    rules = [rule.strip() for rule in rules]
    pages = [page.strip("\n") for page in pages]
    pages = [list(map(int, page.split(","))) for page in pages]
    return [rules, pages]


def p1(input):
    rules = input[0]
    pages = input[1]
    middleSumCorrect = 0
    middleSumIncorrect = 0
    correct = []
    incorrect = []
    # p1
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
        else:
            incorrect.append(pages[i])
    for numList in correct:
        middleSumCorrect += numList[len(numList) // 2]
    # p2
    for i in range(len(incorrect)):
        swapped = True
        while swapped:
            swapped = False
            for j in range(len(rules)):
                leftnum = int(rules[j].split("|")[0])
                rightnum = int(rules[j].split("|")[1])
                if leftnum in incorrect[i] and rightnum in incorrect[i]:
                    leftIndex = incorrect[i].index(leftnum)
                    rightIndex = incorrect[i].index(rightnum)
                    if leftIndex > rightIndex:
                        incorrect[i][leftIndex], incorrect[i][rightIndex] = incorrect[i][rightIndex], incorrect[i][leftIndex]
                        swapped = True
    for numList in incorrect:
        middleSumIncorrect += numList[len(numList) // 2]
    print("P1: " + str(middleSumCorrect) + "\nP2: " + str(middleSumIncorrect))


p1(parseInput())
