#Branches
1. master
    - A master branch, used only for release. Typical name master.
2. dev
    - A "dev" branch off of that branch. 
    That's the one used for most main-line work. A commonly named dev.
3. feature
    - Multiple feature branches off of the dev branch. 
    Name based on the name of the feature. 
    These will be merged back into the dev, not into the master or release branches.
4. release
    - Release branch to hold candidate releases, 
    with only bug fixes and no new features. The typical name rc1.1
    
#Branch naming conventions

Choose short tokens, so they do not add too much noise to every one of your branch names.

```
wip       Works in progress; stuff I know won't be finished soon
feat      Feature I'm adding or expanding
bug       Bug fix or experiment
junk      Throwaway branch created to experiment
```

Each of these tokens can be used to tell you to which part of your workflow each branch belongs.

**feature/{short token}_{your action in short way}**

Ex :
```
feature/feat_login
```

# Versioning

Semantic versioning follows the pattern of X.Y.Z

Or more readable would be ```[major].[minor].[patch]-[build/beta/rc]```

E.g. **1.2.0-beta**

```major or X ``` can be incremented if there are major changes in software, like backward-incompatible API release.

```minor or Y``` is incremented if backward compatible APIs are introduce.

```patch or Z``` is incremented after a bug fix.

# Any problem
Feel free to contact me 
* mobile - +94712992382
* email  - shalithax@gmail.com
