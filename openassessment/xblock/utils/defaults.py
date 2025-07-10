"""Default data initializations for the XBlock, with formatting preserved."""
# pylint: disable=line-too-long

from openassessment.assessment.api.peer import PeerGradingStrategy


DEFAULT_PROMPT = """
    Nhập đề bài tập và hướng dẫn tại đây.
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

DEFAULT_RUBRIC_CRITERIA = [
    {
        'name': "Điểm bài làm",
        'label': "Điểm bài làm",
        'prompt': "Điểm bài làm",
        'order_num': 0,
        'feedback': 'disabled',
        'options': [
            {
                'order_num': 0, 'points': 0, 'name': '0  điểm', 'label': '0  điểm',
                'explanation': '0 điểm'
            },
            {
                'order_num': 1, 'points': 5, 'name': '0.5 điểm', 'label': '0.5 điểm',
                'explanation': '5% tổng điểm'
            },
            {
                'order_num': 2, 'points': 10, 'name': '1.0 điểm', 'label': '1.0 điểm',
                'explanation': '10% tổng điểm'
            },
            {
                'order_num': 3, 'points': 15, 'name': '1.5 điểm', 'label': '1.5 điểm',
                'explanation': '15% tổng điểm'
            },
            {
                'order_num': 4, 'points': 20, 'name': '2.0 điểm', 'label': '2.0 điểm',
                'explanation': '20% tổng điểm'
            },
            {
                'order_num': 5, 'points': 25, 'name': '2.5 điểm', 'label': '2.5 điểm',
                'explanation': '25% tổng điểm'
            },
            {
                'order_num': 6, 'points': 30, 'name': '3.0 điểm', 'label': '3.0 điểm',
                'explanation': '30% tổng điểm'
            },
            {
                'order_num': 7, 'points': 35, 'name': '3.5 điểm', 'label': '3.5 điểm',
                'explanation': '35% tổng điểm'
            },
            {
                'order_num': 8, 'points': 40, 'name': '4.0 điểm', 'label': '4.0 điểm',
                'explanation': '40% tổng điểm'
            },
            {
                'order_num': 9, 'points': 45, 'name': '4.5 điểm', 'label': '4.5 điểm',
                'explanation': '45% tổng điểm'
            },
            {
                'order_num': 10, 'points': 50, 'name': '5.0 điểm', 'label': '5.0 điểm',
                'explanation': '50% tổng điểm'
            },
            {
                'order_num': 11, 'points': 55, 'name': '5.5 điểm', 'label': '5.5 điểm',
                'explanation': '55% tổng điểm'
            },
            {
                'order_num': 12, 'points': 60, 'name': '6.0 điểm', 'label': '6.0 điểm',
                'explanation': '60% tổng điểm'
            },
            {
                'order_num': 13, 'points': 65, 'name': '6.5 điểm', 'label': '6.5 điểm',
                'explanation': '65% tổng điểm'
            },
            {
                'order_num': 14, 'points': 70, 'name': '7.0 điểm', 'label': '7.0 điểm',
                'explanation': '70% tổng điểm'
            },
            {
                'order_num': 15, 'points': 75, 'name': '7.5 điểm', 'label': '7.5 điểm',
                'explanation': '75% tổng điểm'
            },
            {
                'order_num': 16, 'points': 80, 'name': '8.0 điểm', 'label': '8.0 điểm',
                'explanation': '80% tổng điểm'
            },
            {
                'order_num': 17, 'points': 85, 'name': '8.5 điểm', 'label': '8.5 điểm',
                'explanation': '85% tổng điểm'
            },
            {
                'order_num': 18, 'points': 90, 'name': '9.0 điểm', 'label': '9.0 điểm',
                'explanation': '90% tổng điểm'
            },
            {
                'order_num': 19, 'points': 95, 'name': '9.5 điểm', 'label': '9.5 điểm',
                'explanation': '95% tổng điểm'
            },
            {
                'order_num': 20, 'points': 100, 'name': '10 điểm', 'label': '10 điểm',
                'explanation': '100% tổng điểm'
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
