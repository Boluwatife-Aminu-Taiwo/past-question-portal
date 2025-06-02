import requests
from bs4 import BeautifulSoup
from app.routes.course_utils import CourseData


def fetch_courses(url):
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "lxml")
    levels = soup.find_all("strong", string=lambda t: t and ("level" in t.lower() or "summer term" in t.lower()))

    year_labels = []
    for idx, level in enumerate(levels):
        current_text = level.get_text(strip=True)
        if "summer term" in current_text.lower() and idx > 0:
            prev_text = levels[idx - 1].get_text(strip=True)
            year_labels.append(f"{prev_text} {current_text}")
        else:
            year_labels.append(current_text)

    courses = []
    tbodies = soup.find_all("tbody")
    for idx, tbody in enumerate(tbodies):
        year = year_labels[idx] if idx < len(year_labels) else "Unknown"
        rows = tbody.find_all("tr")
        if not rows:
            continue
        header = ["CODE", "TITLE", "UNIT", "STATUS"]

        if len(rows) > 1:

            for tr in rows[1:]:  # Skip header row
                
                values = [td.get_text(strip=True) for td in tr.find_all("td")]


                data = dict(zip(header, values))
                gpa = CourseData.parse_gpa(data.get("UNIT", ""))
                course = CourseData(
                    code=data.get("CODE", ""),
                    title=data.get("TITLE", ""),
                    status=data.get("STATUS", ""),
                    gpa=gpa,
                    year=year
                )
                courses.append(course)
        else:
            for tr in rows[0:1]:  # Process header row
                values = [td.get_text(strip=True) for td in tr.find_all("td")]


                data = dict(zip(header, values))
                gpa = CourseData.parse_gpa(data.get("UNIT", ""))
                course = CourseData(
                    code=data.get("CODE", ""),
                    title=data.get("TITLE", ""),
                    status=data.get("STATUS", ""),
                    gpa=gpa,
                    year=year
                )
                courses.append(course)

    return courses

