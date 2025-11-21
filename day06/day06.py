import math


def parseInput():
    f = open("./day06input.txt", "r")
    input = f.read()
    return input.replace("\n", "")


def oob(current_pos, direction, input):
    N = math.sqrt(len(input))
    if direction == -N and current_pos < N:
        return True
    elif direction == N and current_pos >= len(input) - N:
        return True
    elif direction == -1 and current_pos % N == 0:
        return True
    elif direction == 1 and (current_pos + 1) % N == 0:
        return True
    return False


def turn_right(current_dir, OFFSETS):
    idx = OFFSETS.index(current_dir)
    return OFFSETS[(idx + 1) if (idx + 1) < len(OFFSETS) else 0]


def p1(input):
    N = int(math.sqrt(len(input)))
    OFFSETS = [-N, 1, N, -1]  # north, east, south, west
    current_dir = OFFSETS[0]  # start facing north
    distinct_positions = set()
    current_pos = input.index("^")
    distinct_positions.add(current_pos)
    while True:
        if oob(current_pos, current_dir, input):
            break
        else:
            print(current_pos, current_dir)
            if input[current_pos + current_dir] == "#":
                current_dir = turn_right(current_dir, OFFSETS)
        distinct_positions.add(current_pos + current_dir)
        current_pos += current_dir
    print(len(distinct_positions))


p1(parseInput())
