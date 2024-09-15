import json
from django.http import HttpRequest, JsonResponse
from issues.models import Issue

issue_fields = ["id", "title", "description"]
issue_required_fields = ["title", "description"]


def issues(request: HttpRequest):
    if request.method == "GET":
        issues = Issue.objects.values(*issue_fields)
        return JsonResponse({"data": list(issues)})
    elif request.method == "POST":
        data = json.loads(request.body)
        for field in issue_required_fields:
            if not field in data or not data[field]:
                return JsonResponse(
                    {"message": f"{field} field is required"}, status=400
                )
        issue = Issue.objects.create(**data)
        issues = Issue.objects.filter(id=issue.id).values(*issue_fields)
        return JsonResponse({"data": list(issues)[0]})
