"""
Errors and exceptions for submission API
"""


class NoTeamToCreateSubmissionForError(Exception):
    pass


class EmptySubmissionError(Exception):
    pass


class DraftSaveException(Exception):
    pass


class SubmissionValidationException(Exception):
    pass


class AnswerTooLongException(Exception):
    pass


class SubmitInternalError(Exception):
    pass


class StudioPreviewException(Exception):
    pass


class MultipleSubmissionsException(Exception):
    pass


class DeleteNotAllowed(Exception):
    pass


class OnlyOneFileAllowedException(Exception):
    pass


class UnsupportedFileTypeException(Exception):
    pass


class SubmissionFileMissingException(Exception):
    """
    Raised on submit when the saved file metadata references files
    that do not exist in the file storage backend.
    """

    def __init__(self, missing_file_names):
        self.missing_file_names = missing_file_names
        super().__init__(f"Files referenced by the submission do not exist in storage: {missing_file_names}")
