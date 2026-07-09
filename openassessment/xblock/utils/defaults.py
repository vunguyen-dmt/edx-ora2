"""Default data initializations for the XBlock, with formatting preserved."""
# pylint: disable=line-too-long

from openassessment.assessment.api.peer import PeerGradingStrategy


# DEFAULT_PROMPT = """
#     Censorship in the Libraries

#     'All of us can think of a book that we hope none of our children or any other children have taken off the shelf. But if I have the right to remove that book from the shelf -- that work I abhor -- then you also have exactly the same right and so does everyone else. And then we have no books left on the shelf for any of us.' --Katherine Paterson, Author

#     Write a persuasive essay to a newspaper reflecting your views on censorship in libraries. Do you believe that certain materials, such as books, music, movies, magazines, etc., should be removed from the shelves if they are found offensive? Support your position with convincing arguments from your own experience, observations, and/or reading.

#     Read for conciseness, clarity of thought, and form.
# """  # nopep8

DEFAULT_PROMPT = """
Nội dung câu hỏi.
"""  # nopep8

# DEFAULT_RUBRIC_CRITERIA = [
#     {
#         'name': "Ideas",
#         'label': "Ideas",
#         'prompt': "Determine if there is a unifying theme or main idea.",
#         'order_num': 0,
#         'feedback': 'optional',
#         'options': [
#             {
#                 'order_num': 0, 'points': 0, 'name': 'Poor', 'label': 'Poor',
#                 'explanation': """Difficult for the reader to discern the main idea.  Too brief or too repetitive to establish or maintain a focus."""  # nopep8
#             },
#             {
#                 'order_num': 1, 'points': 3, 'name': 'Fair', 'label': 'Fair',
#                 'explanation': """Presents a unifying theme or main idea, but may include minor tangents.  Stays somewhat focused on topic and task."""  # nopep8
#             },
#             {
#                 'order_num': 2, 'points': 5, 'name': 'Good', 'label': 'Good',
#                 'explanation': """Presents a unifying theme or main idea without going off on tangents.  Stays completely focused on topic and task."""  # nopep8
#             },
#         ],
#     },
#     {
#         'name': "Content",
#         'label': "Content",
#         'prompt': "Assess the content of the submission",
#         'order_num': 1,
#         'options': [
#             {
#                 'order_num': 0, 'points': 0, 'name': 'Poor', 'label': 'Poor',
#                 'explanation': """Includes little information with few or no details or unrelated details.  Unsuccessful in attempts to explore any facets of the topic."""  # nopep8
#             },
#             {
#                 'order_num': 1, 'points': 1, 'name': 'Fair', 'label': 'Fair',
#                 'explanation': """Includes little information and few or no details.  Explores only one or two facets of the topic."""  # nopep8
#             },
#             {
#                 'order_num': 2, 'points': 3, 'name': 'Good', 'label': 'Good',
#                 'explanation': """Includes sufficient information and supporting details. (Details may not be fully developed; ideas may be listed.)  Explores some facets of the topic."""  # nopep8
#             },
#             {
#                 'order_num': 3, 'points': 5, 'name': 'Excellent', 'label': 'Excellent',
#                 'explanation': """Includes in-depth information and exceptional supporting details that are fully developed.  Explores all facets of the topic."""  # nopep8
#             },
#         ],
#     },
# ]

# DEFAULT_RUBRIC_CRITERIA = [
#     {
#         'name': "Ý tưởng",
#         'label': "Ý tưởng",
#         'prompt': "Đánh giá ý tưởng của bài nộp",
#         'order_num': 0,
#         'feedback': 'optional',
#         'options': [
#             {
#                 'order_num': 0, 'points': 0, 'name': 'Không đạt', 'label': 'Không đạt',
#                 'explanation': """Lạc đề hoàn toàn hoặc không có chủ đề"""  # nopep8
#             },
#             {
#                 'order_num': 1, 'points': 1, 'name': 'Kém', 'label': 'Kém',
#                 'explanation': """Chủ đề cực kỳ mờ nhạt, các ý hoàn toàn rời rạc."""  # nopep8
#             },
#             {
#                 'order_num': 2, 'points': 2, 'name': 'Yếu', 'label': 'Yếu',
#                 'explanation': """Có chủ đề nhưng triển khai lỏng lẻo, dễ bị chệch hướng."""  # nopep8
#             },
#                         {
#                 'order_num': 3, 'points': 3, 'name': 'Đạt', 'label': 'Đạt',
#                 'explanation': """Chủ đề rõ ràng, cấu trúc thống nhất, đáp ứng đúng yêu cầu cốt lõi."""  # nopep8
#             },
#                         {
#                 'order_num': 4, 'points': 4, 'name': 'Khá', 'label': 'Khá',
#                 'explanation': """Ý tưởng mạch lạc, xuyên suốt, các phần kết nối logic chặt chẽ."""  # nopep8
#             },
#                         {
#                 'order_num': 5, 'points': 5, 'name': 'Giỏi', 'label': 'Giỏi',
#                 'explanation': """Ý tưởng sắc sảo, độc đáo và có tính nhất quán tuyệt đối."""  # nopep8
#             },
#         ],
#     },
#     {
#         'name': "Nội dung",
#         'label': "Nội dung",
#         'prompt': "Đánh giá nội dung của bài nộp",
#         'order_num': 1,
#         'options': [
#             {
#                 'order_num': 0, 'points': 0, 'name': 'Không đạt', 'label': 'Không đạt',
#                 'explanation': """Nội dung trống rỗng hoặc không phù hợp."""  # nopep8
#             },
#             {
#                 'order_num': 1, 'points': 1, 'name': 'Kém', 'label': 'Kém',
#                 'explanation': """Nội dung quá sơ sài, thiếu kiến thức cơ bản."""  # nopep8
#             },
#             {
#                 'order_num': 2, 'points': 2, 'name': 'Yếu', 'label': 'Yếu',
#                 'explanation': """Nội dung còn sơ sài, chưa đi sâu vào chi tiết."""  # nopep8
#             },
#                         {
#                 'order_num': 3, 'points': 3, 'name': 'Đạt', 'label': 'Đạt',
#                 'explanation': """Nội dung đầy đủ ý chính, lập luận rõ ràng, đúng trọng tâm."""  # nopep8
#             },
#                         {
#                 'order_num': 4, 'points': 4, 'name': 'Khá', 'label': 'Khá',
#                 'explanation': """Nội dung phong phú, dẫn chứng chính xác và thuyết phục."""  # nopep8
#             },
#                         {
#                 'order_num': 5, 'points': 5, 'name': 'Giỏi', 'label': 'Giỏi',
#                 'explanation': """Nội dung sâu sắc, thể hiện tư duy phản biện hoặc góc nhìn xuất sắc."""  # nopep8
#             },
#         ],
#     },
# ]

DEFAULT_RUBRIC_CRITERIA = [
    {
        'name': "Đánh giá tổng thể",
        'label': "Đánh giá tổng thể",
        'prompt': "Đánh giá tổng thể bài nộp",
        'order_num': 0,
        'feedback': 'optional',
        'options': [
            {
                'order_num': 0, 'points': 0, 'name': '0', 'label': '0',
                'explanation': """0"""  # nopep8
            },
            {
                'order_num': 1, 'points': 1, 'name': '1', 'label': '1',
                'explanation': """1"""  # nopep8
            },
            {
                'order_num': 2, 'points': 2, 'name': '2', 'label': '2',
                'explanation': """2"""  # nopep8
            },
            {
                'order_num': 3, 'points': 3, 'name': '3', 'label': '3',
                'explanation': """3"""  # nopep8
            },
            {
                'order_num': 4, 'points': 4, 'name': '4', 'label': '4',
                'explanation': """4"""  # nopep8
            },
            {
                'order_num': 5, 'points': 5, 'name': '5', 'label': '5',
                'explanation': """5"""  # nopep8
            },
            {
                'order_num': 6, 'points': 6, 'name': '6', 'label': '6',
                'explanation': """6"""  # nopep8
            },
            {
                'order_num': 7, 'points': 7, 'name': '7', 'label': '7',
                'explanation': """7"""  # nopep8
            },
            {
                'order_num': 8, 'points': 8, 'name': '8', 'label': '8',
                'explanation': """8"""  # nopep8
            },
            {
                'order_num': 9, 'points': 9, 'name': '9', 'label': '9',
                'explanation': """9"""  # nopep8
            },
            {
                'order_num': 10, 'points': 10, 'name': '10', 'label': '10',
                'explanation': """10"""  # nopep8
            }
        ],
    }
]


# The rubric's feedback prompt is a set of instructions letting the student
# know they can provide additional free form feedback in their assessment.
DEFAULT_RUBRIC_FEEDBACK_PROMPT = """
(Optional) What aspects of this response stood out to you? What did it do well? How could it be improved?
"""

# The rubric's feedback text is the default text displayed and used as
# the student's response to the feedback prompt
DEFAULT_RUBRIC_FEEDBACK_TEXT = """
I think that this response...
"""

DEFAULT_EXAMPLE_ANSWER = (
    "Replace this text with your own sample response for this assignment. "
    "Then, under Response Score to the right, select an option for each criterion. "
    "Learners practice performing peer assessments by assessing this response and comparing "
    "the options that they select in the rubric with the options that you specified."
)

DEFAULT_EXAMPLE_ANSWER_2 = (
    "Replace this text with another sample response, "
    "and then specify the options that you would select for this response."
)

DEFAULT_STUDENT_TRAINING = {
    "name": "student-training",
    "start": None,
    "due": None,
    "examples": [
        {
            "answer": DEFAULT_EXAMPLE_ANSWER,
            "options_selected": [
                {
                    "criterion": "Ideas",
                    "option": "Fair"
                },
                {
                    "criterion": "Content",
                    "option": "Good"
                }
            ]
        },
        {
            "answer": DEFAULT_EXAMPLE_ANSWER_2,
            "options_selected": [
                {
                    "criterion": "Ideas",
                    "option": "Poor"
                },
                {
                    "criterion": "Content",
                    "option": "Good"
                }
            ]
        }
    ]
}

DEFAULT_START = "2001-01-01T00:00"
DEFAULT_DUE = "2029-01-01T00:00"

# The Default Peer Assessment is created as an example of how this XBlock can be
# configured. If no configuration is specified, this is the default assessment
# module(s) associated with the XBlock.
DEFAULT_PEER_ASSESSMENT = {
    "name": "peer-assessment",
    "start": DEFAULT_START,
    "due": DEFAULT_DUE,
    "must_grade": 5,
    "must_be_graded_by": 3,
    "enable_flexible_grading": False,
    "grading_strategy": PeerGradingStrategy.MEDIAN,
    "flexible_grading_days": 7,
    "flexible_grading_graded_by_percentage": 30
}

DEFAULT_SELF_ASSESSMENT = {
    "name": "self-assessment",
    "start": DEFAULT_START,
    "due": DEFAULT_DUE,
}

DEFAULT_STAFF_ASSESSMENT = {
    "name": "staff-assessment",
    "start": DEFAULT_START,
    "due": DEFAULT_DUE,
    "required": False,
}

ACTIVE_STAFF_ASSESSMENT = {
    "name": "staff-assessment",
    "start": DEFAULT_START,
    "due": DEFAULT_DUE,
    "required": True,
}

DEFAULT_ASSESSMENT_MODULES = [
    DEFAULT_STUDENT_TRAINING,
    DEFAULT_PEER_ASSESSMENT,
    DEFAULT_SELF_ASSESSMENT,
    DEFAULT_STAFF_ASSESSMENT,
]

DEFAULT_EDITOR_ASSESSMENTS_ORDER = [
    "student-training",
    "peer-assessment",
    "self-assessment",
    "staff-assessment",
]

SELF_ASSESSMENT_MODULES = [
    DEFAULT_SELF_ASSESSMENT,
]

PEER_ASSESSMENT_MODULES = [
    DEFAULT_STUDENT_TRAINING,
    DEFAULT_PEER_ASSESSMENT,
]

STAFF_ASSESSMENT_MODULES = [
    ACTIVE_STAFF_ASSESSMENT,
]

SELF_TO_PEER_ASSESSMENT_MODULES = [
    DEFAULT_STUDENT_TRAINING,
    DEFAULT_SELF_ASSESSMENT,
    DEFAULT_PEER_ASSESSMENT,
]

SELF_TO_STAFF_ASSESSMENT_MODULES = [
    DEFAULT_SELF_ASSESSMENT,
    ACTIVE_STAFF_ASSESSMENT,
]

DATE_CONFIG_MANUAL = 'manual'
DATE_CONFIG_SUBSECTION = 'subsection'
DATE_CONFIG_COURSE_END = 'course_end'
