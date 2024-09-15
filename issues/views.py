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


def issue(request: HttpRequest, id: int):
    try:
        issue = Issue.objects.get(id=id)
    except Issue.DoesNotExist:
        return JsonResponse({"message": "Issue does not exist"}, status=404)
    if request.method == "GET":
        issue = {key: getattr(issue, key) for key in issue_fields}
        return JsonResponse({"data": issue})
    elif request.method == "POST":
        data = json.loads(request.body)
        for field in issue_required_fields:
            if not field in data or not data[field]:
                return JsonResponse(
                    {"message": f"{field} field is required"}, status=400
                )
            setattr(issue, field, data[field])
        issue.save()
        issues = Issue.objects.filter(id=issue.id).values(*issue_fields)
        return JsonResponse({"data": list(issues)[0]})
    elif request.method == "DELETE":
        deleted_issue = {key: getattr(issue, key) for key in issue_fields}
        Issue.objects.filter(id=issue.id).delete()
        return JsonResponse({"data": deleted_issue})