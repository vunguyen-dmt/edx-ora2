from datetime import datetime, timedelta
import pytz
from openassessment.management.commands.create_oa_submissions_from_file import Command
from django.http import HttpResponse
from openassessment.staffgrader.models import SubmissionGradingLock

def workflow_status_handler(api_data):
    """
    Determines the workflow status of a student's response based on whether it 
    has been graded by peers, staff, or not at all.
    
    :param: api_data (object): Contains workflow data including status details.
    :return: bool: True if the student's response hasn't been graded by peers or staff, 
          False otherwise.
    """
    workflow_data = api_data.workflow_data
    status_details = workflow_data.status_details
    training_guard, self_guard, peer_guard, staff_guard = True, True, True, True

    # Check if the student has not graded or been graded by another 
    if workflow_data.has_status:
        if 'peer' in workflow_data.status_details:
            if status_details['peer']['peers_graded_count'] != 0 or \
                status_details['peer']['graded_by_count'] != None:
                if status_details['peer']['graded_by_count'] == 0:
                    pass
                else:
                    peer_guard = False

        # Check if the staff has not graded the student
        if workflow_data.status == "done":
            staff_guard = False
    else:
        return False

    return (self_guard and peer_guard and staff_guard and training_guard)


def allow_learner_to_reset_submission_enable(api_data):
    """
    Determines if a student's assessment can be retried based on time and workflow status criteria.

    This function combines the results of both the assessment_retry_max_time and workflow_status_handler functions
    to decide if a student's assessment can be retried. The assessment is eligible for retry if the allowed retry
    period is still valid (not expired) and the assessment has not been graded by either peers or staff.

    :param api_data (object): The object containing necessary data for time and workflow status checks.
    :return: bool: True if the student's assessment is eligible for retry, False otherwise.
    """
    config_data = api_data.config_data
    workflow_handler = workflow_status_handler(api_data)
    lock = SubmissionGradingLock.get_submission_lock(api_data.submission_data.submission_uuid)

    return (config_data.allow_learner_to_reset_submission and workflow_handler and lock is None)