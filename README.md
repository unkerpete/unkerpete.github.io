# Group'em

## Intro
This project aims to build a tool for splitting a main group of names randomly into smaller sub-groups. This tool was first intended to be used as an ice breaking tool for a group of 15 students by splitting them randomly into groups of 3.
Why 3? It is the author's belief that 3 is an optimal number for a team to work efficiently together. You may wish to read https://www.forbes.com/sites/jaimepotter/2020/04/27/the-ideal-team-size-at-work-may-be-smaller-than-you-think/?sh=2ca47bd2630a

## Tech used
HTML, CSS, vanilla Javascript, css elements from getbootstrap.com

## How to use
The interface will allow a user to add a name individually or a group of names(separated by a space) to their screen. Names added will also be attached with its own delete feature for user to remove names. User then enters a limited choice of the size (number of members) of the sub-group that they want to split their main group into.

User can then click to generate the first session of randomised sub-grouping and click again for subsequent sessions of randomised sub-grouping.

**Limitations and unsolved problems will be explained below.**

## Approach
To create the first randomised session of sub-grouping:
-the list of names added are stored in an array
-the array is then randomised
-using a nested for loop, the inner loops pops the randomised array for X amount of times for X value of the subGroupSize into a new array that represents a sub-group. And the outer loop repeats the inner loop process Y number of times for Y value of subGroups required.
-each sub-group array is then pushed into a new array
-the new array will now have nested arrays of sub-groups which will be appended onto the html doc

To create the second and any subsequent sessions of sub-grouping:
-a loop is used to pop the last name of each sub-group (thats runs the equivalent amount of time as the subGroupSize) from the previous grouping. These names will form the first array of sub-group of the subsequent session, and pushed into another array
i.e. [c, f, i] will be obtained from [[a, b, c], [d, e, f], [g, h, i]].
-the left overs are then joined together in an array and randomised again
-this newly randomised array will then go through a loop process that the names into new sub-groups arrays
-these new sub-groups will then be pushed into the same array that is currently holding the first array of sub-group
-this array of sub-groups arrays is then appended into the html doc

## Limitations and Unsolved Problems

For clarity:
overallGroupSize refers to the amount of names of the overall group;
subGroupSize refers to the amount of names in a sub-group;
subGroupNum refers to the amount of sub-groups per session;

**Limitation: subGroupSize needs to be a smaller number than subGroupNum**
Because of the method explained above in the approach section, i.e. taking the last name of each sub-group to form the first sub-group for the next session, the program will not be able to sub-group beyond the 1st session when subGroupSize is larger than SubGroupNum. This is visualised better below:

[[a, b, c, d],
 [e, f, g, h],
 [i, j, k, l]]

The last elements of each inner array (d, h, l) will not be enough to form the required subGroupSize of 4 elements. 

Our approach works best when randomising overallGroupSize of square numbers into subGroupSizes of its square root. Such as an overallGroupSize of 9 being randomised into subGroupSizes of 3, or overallGroupSize of 16 being randomised into subGroupSizes of 4.

[[a, b, c],
 [d, e, f],
 [g, h, i]]

[[a, b, c, d],
 [e, f, g, h],
 [i, j, k, l],
 [m, n, o, p]]

 This program currently throws an alert to the user when subGroupSizes is a smaller number than SubGroupNum.

**Limitation: subGroupSize needs to be a factor of overallGroupSize**
The program currently only accept, subject to other limitations, subGroupSizes that are a factor of the overallGroupSize. 

**Modify these limitations on line 86**

## Further work/features
As it is now, this program only ensures unique sub-groupings up to Session 3.

We hope to improve this program to where it can generate a list of sessions and unique sub-groupings. To the point where it ensures each name in the overallGroup has been placed in the same sub-group all other names at least once.