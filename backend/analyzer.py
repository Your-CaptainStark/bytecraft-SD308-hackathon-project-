from skills import ROLE_SKILLS


def extract_skills(text: str):
    """
    Find known skills inside resume text.
    """

    text_lower = text.lower()

    found_skills = []

    for skill in get_all_skills():

        if skill.lower() in text_lower:
            found_skills.append(skill)

    return found_skills


def get_all_skills():
    """
    Return every unique skill from the role database.
    """

    skills = set()

    for role in ROLE_SKILLS.values():
        skills.update(role.keys())

    return sorted(skills)


def calculate_skill_level(skill, resume_text):
    """
    Estimate a user's skill level from resume text.

    This is a simple MVP scoring system.
    """

    text = resume_text.lower()

    skill_lower = skill.lower()

    if skill_lower not in text:
        return 0

    # Basic evidence scoring

    score = 35

    keywords = [
        "project",
        "developed",
        "built",
        "implemented",
        "experience",
        "worked",
        "internship",
        "deployed",
    ]

    evidence_count = 0

    for keyword in keywords:
        if keyword in text:
            evidence_count += 1

    score += min(evidence_count * 7, 35)

    # Mentioning the skill multiple times
    occurrences = text.count(skill_lower)

    score += min(occurrences * 5, 30)

    return min(score, 100)


def analyze_resume(resume_text, target_role):
    """
    Compare resume skills with target role requirements.
    """

    # Normalize role name
    target_role_clean = target_role.strip().lower()

    role_lookup = {
    role.lower(): role
    for role in ROLE_SKILLS
     }

    if target_role_clean not in role_lookup:
      return {
        "success": False,
        "message": f"Target role not found: {target_role}"
    }

    target_role = role_lookup[target_role_clean]

    required_skills = ROLE_SKILLS[target_role]

    required_skills = ROLE_SKILLS[target_role]

    results = []

    for skill, required_level in required_skills.items():

        current_level = calculate_skill_level(
            skill,
            resume_text
        )

        gap = max(
            required_level - current_level,
            0
        )

        if current_level >= required_level:

            status = "strong"

        elif current_level >= required_level * 0.5:

            status = "improve"

        else:

            status = "critical"

        results.append({
            "name": skill,
            "current": current_level,
            "required": required_level,
            "gap": gap,
            "status": status
        })

    # Calculate overall match

    total_required = sum(
        required_skills.values()
    )

    total_current = sum(
        min(
            item["current"],
            item["required"]
        )
        for item in results
    )

    match_percentage = round(
        (total_current / total_required) * 100
    )

    strong = [
        item for item in results
        if item["status"] == "strong"
    ]

    improve = [
        item for item in results
        if item["status"] == "improve"
    ]

    critical = [
        item for item in results
        if item["status"] == "critical"
    ]

    return {
        "success": True,
        "target_role": target_role,
        "match_percentage": match_percentage,
        "detected_skills": extract_skills(resume_text),
        "skills": results,
        "summary": {
            "strong": len(strong),
            "improve": len(improve),
            "critical": len(critical)
        }
    }