import re

class CourseData:
    def __init__(self, code, title, gpa, status, year):
        self.code = code
        self.title = title
        self.gpa = gpa
        self.status = status
        self.year = year

    def to_dict(self):
        return {
            "Code": self.code,
            "Title": self.title,
            "GPA": f"{self.gpa:.2f}",
            "Status": self.status,
            "Year": self.year
        }

    @staticmethod
    def parse_gpa(raw_unit):
        import re
        match = re.search(r"\d+(\.\d+)?", raw_unit)
        return round(float(match.group()), 2) if match else 0.0