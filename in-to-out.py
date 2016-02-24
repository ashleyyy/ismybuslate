"""

    Takes a text list of routes and makes them suitable
    for framing (in a JSON list at any rate)

"""

with open('in.txt') as f:
    for l in f.readlines():
        l = l.strip('\n')
        print('"{}",'.format(l))
