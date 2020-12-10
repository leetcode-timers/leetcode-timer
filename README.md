
# Leetcode Timer

#### Hello!


These APIs are for the backend for **Leetcode Timer** - an app that helps you keep a track of how much time you took to attempt each question.

Before we begin, there's something I'd like to share.

<strong>
Since Amazon charges me to keep my services running, I've turned them off. So, if you try running these requests again, they're going to fail. So please don't invest your time in trying something that you know will fail.
The same thing goes for the tokens. By the time you're reading this, the instance will cease to exist. So don't worry.
</strong>

Great! We can begin!
___
If you'd like to know how this project came into being, read on, my curious friend, I like you.

##### The inception
With the interview season coming up, I did what every software engineer does to prepare for interviews - [Leetcode](https://www.leetcode.com).

I enjoyed solving the questions there. I took my sweet time to try every approach, make sure my syntax was right, dry-run the algorithms with as many test cases I could, and enjoy.

Then one day, I took a mock interview. While solving the question, everything was moving fast. By the time I could properly read the question I was already 7 minutes into a 20-minute problem. Although I could finish the question on time, I could not dry run all the edge cases and directly had to compile my solution.

And that's when it hit me. We need to practice problems but in a timed environment.

___
Do you know why I absolutely love this project?
You're reading on! You rock!
##### The Pyaar ki Wajah ( Reason for love )

I told this idea to my roommate and we set up a [repo](https://github.com/m7saikat/leetcode-timed-prep) (currently private, but request access if you'd like!) app on May 1, 2020. 11 days later, we saw the same [feature request](https://leetcode.com/discuss/general-discussion/626102/LeetCode-Suggestion%3A-Timer-to-track-time-spend-on-a-problem) on Leetcode with over 850+ votes.

So every time I'm working on this project, I feel like I'm making at least 849 lives easier, yay!

___
As always, I love suggestions ( or appreciation ). Reach me out on twitter [@nachiketsd](https://twitter.com/NachiketSD) or connect with me on LinkedIn [@nachiketdhamankar](https://www.linkedin.com/in/nachiket-dhamankar)

PS: 
I'll be publishing my design choices on my [blog](http://blog.nachiket.me) soon! 


## Indices

  * [DELETE User](#1-delete-user)
  * [GET Attempted Questions](#2-get-attempted-questions)
  * [GET Attempts](#3-get-attempts)
  * [GET Dashboard](#4-get-dashboard)
  * [GET User](#5-get-user)
  * [POST Attempt Question](#6-post-attempt-question)
  * [POST User](#7-post-user)


--------
### 1. DELETE User


Deletes the user account.

The user has to have a valid token (equivalent of signing in) to delete their account. Also, this token should be valid for the same email account that's attempting to be deleted.


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://7tfop0xwsg.execute-api.us-east-1.amazonaws.com/v1/users/nsd@google.com
```


***Headers:***

| Key | Value |
| --- | ------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuc2QxQGdvb2dsZS5jb20iLCJpYXQiOjE1OTM0NDE3NTgsImV4cCI6MTU5MzQ0MTg3OH0.cr52MKhBBuVaz5d4KRCEJGsBarOFmxwNbV8lm-UooPjtlHA81IZPYwWHsFlbnUdFjT5ASd_XBavhMN_t8MjuQA |



***More example Requests/Responses:***


##### I. Example Request: DELETE User: Failed to delete account without login


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiMjZkOGRkZWUtYWNjMC00OTBjLTlmOWQtMjg4MzZhNmExZDNmXCIsXCJlbWFpbFwiOlwibmFjaGlAZmIuY29tXCJ9IiwiaWF0IjoxNjAxMTg4MDA5LCJleHAiOjE2MDExODgxMjl9.2ZmYm_uPcWP85is5UMH6juZTiIl8pNz7pTBawbGEeZbdMI8I2lQjr18teJTHrcctR1s5AffLmkDWkmsMpbgqqA |  |



##### I. Example Response: DELETE User: Failed to delete account without login
```
{
    "message": "Tch, tch. Don't delete someone else's account."
}
```


***Status Code:*** 401

<br>



##### II. Example Request: DELETE User: Successfully delete account


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiMjZkOGRkZWUtYWNjMC00OTBjLTlmOWQtMjg4MzZhNmExZDNmXCIsXCJlbWFpbFwiOlwibmFjaGlAZmIuY29tXCJ9IiwiaWF0IjoxNjAxMTg4MDA5LCJleHAiOjE2MDExODgxMjl9.2ZmYm_uPcWP85is5UMH6juZTiIl8pNz7pTBawbGEeZbdMI8I2lQjr18teJTHrcctR1s5AffLmkDWkmsMpbgqqA |  |



##### II. Example Response: DELETE User: Successfully delete account
```
{
    "message": "User has been successfully deleted."
}
```


***Status Code:*** 200

<br>



### 2. GET Attempted Questions


Returns the list of questions attempted by the user.

The user has to have a valid token (equivalent of signing in) to return list of attempted questions. Also, this token should be valid for the same email account that's attempting to get the info.


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://7tfop0xwsg.execute-api.us-east-1.amazonaws.com/v1/users/nachi@fb.com/questions
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNmViMDUzMGEtMWZkNC00ZDFmLTk5MjEtY2Q2ZjFkN2NjMmUxXCIsXCJlbWFpbFwiOlwibmFjaGlAZmIuY29tXCJ9IiwiaWF0IjoxNTk0MDA2MTYyLCJleHAiOjE1OTQwMDYyODJ9.ZrbSsrc26RE9PT62UQxnizZqGPVYtrfII6tLzLVmj3d-GXlXwwPDmHYiT8iK6PuNcsJZkINhs1EZBhUgCgCh4g |  |



***More example Requests/Responses:***


##### I. Example Request: GET Attempted Questions: Get list of attempted questions


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4ODA5OSwiZXhwIjoxNjAxMTg4MjE5fQ.J797aYMK96IuRWmpYcu6GLR2AX9ZNm4l07vdBBfEUpk7nzeJ2HZ4OYPRPA0LwmSbwEuU1fhq3vIttbVokEux5A |  |



##### I. Example Response: GET Attempted Questions: Get list of attempted questions
```
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4ODMyOCwiZXhwIjoxNjAxMTg4NDQ4fQ.J22SN7chi9_K2AFQLplUVcq95SyUn9FZjuX6PTKZq1RFeYTSPKoYY0LdE6TMkw1igM3piLyLBFtIw0WEdjgbWg",
    "result": [
        {
            "questionId": "1"
        },
        {
            "questionId": "12"
        },
        {
            "questionId": "125"
        }
    ]
}
```


***Status Code:*** 200

<br>



### 3. GET Attempts


Returns the summary of the questions attempted by the user.

The user has to have a valid token (equivalent of signing in) to return the information about their summary. Also, this token should be valid for the same email account that's attempting to get the info.


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://7tfop0xwsg.execute-api.us-east-1.amazonaws.com/v1/users/nachi@fb.com/questions/12
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNmViMDUzMGEtMWZkNC00ZDFmLTk5MjEtY2Q2ZjFkN2NjMmUxXCIsXCJlbWFpbFwiOlwibmFjaGlAZmIuY29tXCJ9IiwiaWF0IjoxNTk0MDA2MTYyLCJleHAiOjE1OTQwMDYyODJ9.ZrbSsrc26RE9PT62UQxnizZqGPVYtrfII6tLzLVmj3d-GXlXwwPDmHYiT8iK6PuNcsJZkINhs1EZBhUgCgCh4g |  |



***More example Requests/Responses:***


##### I. Example Request: GET Attempts: Get information about attempts for a question


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4ODA5OSwiZXhwIjoxNjAxMTg4MjE5fQ.J797aYMK96IuRWmpYcu6GLR2AX9ZNm4l07vdBBfEUpk7nzeJ2HZ4OYPRPA0LwmSbwEuU1fhq3vIttbVokEux5A |  |



##### I. Example Response: GET Attempts: Get information about attempts for a question
```
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4ODM2NiwiZXhwIjoxNjAxMTg4NDg2fQ.vKFt0crqayJ3RHuwhxe5k6zcVNC2HIGvRgzl9pt7ODKQJw_ClT-j3gM-ACOMfqui2qBuCUmLbqYYw_Z3ocAcHQ",
    "result": {
        "attempts": [
            {
                "tackledAt": 1593706699,
                "duration": 5,
                "outcome": "FAILURE"
            },
            {
                "tackledAt": 1593706593,
                "duration": 14,
                "outcome": "SUCCESS"
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



### 4. GET Dashboard


Soon to be deprecated: Placeholder request.


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://7tfop0xwsg.execute-api.us-east-1.amazonaws.com/v1/dashboard
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuc2QxQGdvb2dsZS5jb20iLCJpYXQiOjE1OTM0MDQ1OTgsImV4cCI6MTU5MzQwNDcxOH0.2sPDz6U40wm0P63MGWMu9etA3InQfR5odovKxNTXe48USw1ta3kTJJo1Nj2rVYhzUN-54HkDoakseWwwjSF0qw |  |



***More example Requests/Responses:***


##### I. Example Request: GET Dashboard: Sample homepage


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuc2QxQGdvb2dsZS5jb20iLCJpYXQiOjE1OTM0MDQ1OTgsImV4cCI6MTU5MzQwNDcxOH0.2sPDz6U40wm0P63MGWMu9etA3InQfR5odovKxNTXe48USw1ta3kTJJo1Nj2rVYhzUN-54HkDoakseWwwjSF0qw |  |



##### I. Example Response: GET Dashboard: Sample homepage
```
{
    "message": "Welcome to leetcode timer! An app that will help you with your prep on Leetcode.",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuc2QxQGdvb2dsZS5jb20iLCJpYXQiOjE2MDExODg3NjAsImV4cCI6MTYwMTE4ODg4MH0.H6ynhZi-p1ET6gGvLPUbj6evyWxq6h_3hqizysxSOBc6p3GrT3rV2Jt2CUXptiXnJwhv54G_uBd-ZOA1TCdUJQ"
}
```


***Status Code:*** 200

<br>



### 5. GET User


Returns the information of the user.


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://7tfop0xwsg.execute-api.us-east-1.amazonaws.com/v1/users/nachi@google.com
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiODlkMGM3ZDEtNTEzNi00YjRlLWJkZDktMTQ1NmVlYTcwMzZmXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTU5MzcwNzEzOSwiZXhwIjoxNTkzNzA3MjU5fQ.jqW9oIqCtZxsbtfESCP_oysalfrSmIkgGWgPiNocbZ-hDM4YpwQ15juXof3gOIxmSNpEgArko-5m24lmFcd_UA |  |



***More example Requests/Responses:***


##### I. Example Request: GET User: Sucessfully get user info with successful login


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4NzgxNiwiZXhwIjoxNjAxMTg3OTM2fQ.NhSUw2eep29fPQuXaqXX4gSrr8xp12mcId0hkuYJcKHDJVOJ5yHJDigpllDYXFRBr696SCoq1cRJE1cmrSc3iw |  |



##### I. Example Response: GET User: Sucessfully get user info with successful login
```
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4NzgxNiwiZXhwIjoxNjAxMTg3OTM2fQ.NhSUw2eep29fPQuXaqXX4gSrr8xp12mcId0hkuYJcKHDJVOJ5yHJDigpllDYXFRBr696SCoq1cRJE1cmrSc3iw",
    "result": {
        "password": "thisIsMyPassword",
        "joinedAt": "1601186775",
        "id": "5fa4f603-e82a-404a-8ad0-d73f3d48d83c",
        "email": "nachi@google.com",
        "name": "Nachiket Dhamankar"
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: GET User: Fail to get user info with outdated token


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiODlkMGM3ZDEtNTEzNi00YjRlLWJkZDktMTQ1NmVlYTcwMzZmXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTU5MzcwNzEzOSwiZXhwIjoxNTkzNzA3MjU5fQ.jqW9oIqCtZxsbtfESCP_oysalfrSmIkgGWgPiNocbZ-hDM4YpwQ15juXof3gOIxmSNpEgArko-5m24lmFcd_UA |  |



##### II. Example Response: GET User: Fail to get user info with outdated token
```
{
    "message": "User is not authorized to access this resource with an explicit deny"
}
```


***Status Code:*** 403

<br>



### 6. POST Attempt Question


Posts an attempt to a question by the user.

Whenever the user attempts a question, this request must be sent. 
The body must have fields for 'tackledAt' (in epoch), 'duration' (in minutes) and 'outcome' (Values can be 'SUCCESS' or 'FAILURE').

The body is validated by the server. Hence, if any field is missing, the POST request will be unsuccessful.

The user has to have a valid token (equivalent of signing in) to post their attempt. Also, this token should be valid for the same email account that's attempting to send the request.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://7tfop0xwsg.execute-api.us-east-1.amazonaws.com/v1/users/nachi@fb.com/question/1
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNmViMDUzMGEtMWZkNC00ZDFmLTk5MjEtY2Q2ZjFkN2NjMmUxXCIsXCJlbWFpbFwiOlwibmFjaGlAZmIuY29tXCJ9IiwiaWF0IjoxNTk0MDA2MTYyLCJleHAiOjE1OTQwMDYyODJ9.ZrbSsrc26RE9PT62UQxnizZqGPVYtrfII6tLzLVmj3d-GXlXwwPDmHYiT8iK6PuNcsJZkINhs1EZBhUgCgCh4g |  |



***Body:***

```        
{
    "tackledAt": "1593706593",
    "duration": "14",
    "outcome": "SUCCESS"
}
```



***More example Requests/Responses:***


##### I. Example Request: POST Attempt Question: Sucessfully record an attempt to solve question


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4ODA5OSwiZXhwIjoxNjAxMTg4MjE5fQ.J797aYMK96IuRWmpYcu6GLR2AX9ZNm4l07vdBBfEUpk7nzeJ2HZ4OYPRPA0LwmSbwEuU1fhq3vIttbVokEux5A |  |



***Body:***

```        
{
    "tackledAt": "1593706593",
    "duration": "14",
    "outcome": "SUCCESS"
}
```



##### I. Example Response: POST Attempt Question: Sucessfully record an attempt to solve question
```
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4ODA5OSwiZXhwIjoxNjAxMTg4MjE5fQ.J797aYMK96IuRWmpYcu6GLR2AX9ZNm4l07vdBBfEUpk7nzeJ2HZ4OYPRPA0LwmSbwEuU1fhq3vIttbVokEux5A",
    "result": {
        "message": "Attempt Successfully recorded: {\"tackledAt\":1593706593,\"duration\":14,\"outcome\":\"SUCCESS\"}"
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: POST Attempt Question: Succesfully record an attempt to solve question with outcome of failure


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4ODA5OSwiZXhwIjoxNjAxMTg4MjE5fQ.J797aYMK96IuRWmpYcu6GLR2AX9ZNm4l07vdBBfEUpk7nzeJ2HZ4OYPRPA0LwmSbwEuU1fhq3vIttbVokEux5A |  |



***Body:***

```        
{
    "tackledAt": "1593706599",
    "duration": "25",
    "outcome": "FAILURE"
}
```



##### II. Example Response: POST Attempt Question: Succesfully record an attempt to solve question with outcome of failure
```
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4ODI1MiwiZXhwIjoxNjAxMTg4MzcyfQ.VeU0fAxOGnc9hapWD7q3gy7h-HwprWuYG2mcwbLSpDRYBtMEAVFpwmOc27oVeD1K9LyLNqzDmGF27ztmRgTQgg",
    "result": {
        "message": "Attempt Successfully recorded: {\"tackledAt\":1593706599,\"duration\":25,\"outcome\":\"FAILURE\"}"
    }
}
```


***Status Code:*** 200

<br>



##### III. Example Request: POST Attempt Question: Missing required info


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4ODgzNCwiZXhwIjoxNjAxMTg4OTU0fQ.DhYV9LEXJqGS9zd1XYzMKLG3UsrTN6fFj-HVYWtEWqezEDtu_1Dmgu4BIN97bVeHm3G9UurltIpwzzEu02jmAA |  |



***Body:***

```        
{
    "tackledAt": "1593706593",
    "duration": "14"
}
```



##### III. Example Response: POST Attempt Question: Missing required info
```
{
    "message": "Event object failed validation",
    "details": [
        {
            "keyword": "required",
            "dataPath": ".body",
            "message": "should have required property outcome"
        }
    ]
}
```


***Status Code:*** 400

<br>



### 7. POST User


This endpoint is for sign up as well as log in. This choice was made for 2 reasons - 

1. We would be returning a token back to the client in both situations.
2. The body for logging in is a subset of the body for signing up.

Hence, the backend checks if the user already has an account. If the user does have an account, the backend signs the user in and returns a valid token.
If the user does not have an account, the backend creates an account and returns a token to the client.

The backend intelligently returns error codes if the body does not have all the required information.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://7tfop0xwsg.execute-api.us-east-1.amazonaws.com/v1/users
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer 123 |  |



***Body:***

```        
{
    "email": "nachi@google.com",
    "password": "thisIsMyPassword",
    "name": "Nachiket Dhamankar",
    "joinedAt": "1601186775"
}
```



***More example Requests/Responses:***


##### I. Example Request: POST User: Sucessfully login to account


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer 123 |  |



***Body:***

```        
{
    "email": "nachi@google.com",
    "password": "thisIsMyPassword"
}
```



##### I. Example Response: POST User: Sucessfully login to account
```
{
    "message": "User logged in successfully.",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4NzczNiwiZXhwIjoxNjAxMTg3ODU2fQ.12qNSCuerKtcAutnJVlsHHIz6F8w0U7V09__FanRoRmqV6MtyuRn0IRVoBlC_HhccsKGyan2OJAIQm4vrMCV6A"
}
```


***Status Code:*** 201

<br>



##### II. Example Request: POST User: Missing required info


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer 123 |  |



***Body:***

```        
{
    "email": "nachi@google.com"
}
```



##### II. Example Response: POST User: Missing required info
```
{
    "message": "Event object failed validation",
    "details": [
        {
            "keyword": "required",
            "dataPath": ".body",
            "message": "should have required property password"
        }
    ]
}
```


***Status Code:*** 400

<br>



##### III. Example Request: POST User: Unsuccessful login


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer 123 |  |



***Body:***

```        
{
    "email": "nachi@google.com",
    "password": "thisIsMyPasswordWrong"
}
```



##### III. Example Response: POST User: Unsuccessful login
```
{
    "message": "Incorrect password"
}
```


***Status Code:*** 401

<br>



##### IV. Example Request: POST User: Successfully create new account


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer 123 |  |



***Body:***

```        
{
    "email": "nachi@google.com",
    "password": "thisIsMyPassword",
    "name": "Nachiket Dhamankar",
    "joinedAt": "1601186775"
}
```



##### IV. Example Response: POST User: Successfully create new account
```
{
    "message": "User created successfully.",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNWZhNGY2MDMtZTgyYS00MDRhLThhZDAtZDczZjNkNDhkODNjXCIsXCJlbWFpbFwiOlwibmFjaGlAZ29vZ2xlLmNvbVwifSIsImlhdCI6MTYwMTE4NzYwMiwiZXhwIjoxNjAxMTg3NzIyfQ.ogep2rzJuHbS2Aj7JEXinI91yNERVLuZUQ-yFHOFr2H_P7L7yT2Zdo22BYuFl0TLPiBrXj_RCFXbGnV5sDk07g"
}
```


***Status Code:*** 201

<br>

---
[Back to top](#leetcode-timer)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-12-08 19:23:38 by [docgen](https://github.com/thedevsaddam/docgen)
