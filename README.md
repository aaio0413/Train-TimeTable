# Train-TimeTable


The URL -----> https://aaio0413.github.io/Train-TimeTable/



・Description: 
Manage all train dials you want in one web page that is updated anytime by firebase. July 2018.
Although user can manage train dials, I don't make sign up system. So, the data is stored at the same place all together. That means, at this moment, only one user is allowed (sort of).

・Technical note: 
To remove children in firebase, I was not sure if it's okay to fetch the item's ID and use dataRef.child(id).remove() .
Some say you shouldn't use child's id to remove it, however, a firebase engineer at google says dataRef.child(id).remove() works in stackoverflow (https://stackoverflow.com/users/209103/frank-van-puffelen). I decided to go with this.
