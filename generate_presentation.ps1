$ErrorActionPreference = 'Stop'
$path = Join-Path $PWD 'NexusJobs_Project_Overview.pptx'
function Rgb([int]$r,[int]$g,[int]$b){ return ($b * 65536) + ($g * 256) + $r }
function SetBg($slide,[int]$r,[int]$g,[int]$b){ $slide.FollowMasterBackground = $false; $slide.Background.Fill.Solid(); $slide.Background.Fill.ForeColor.RGB = (Rgb $r $g $b) }
function AddTextbox($slide,$left,$top,$width,$height,$text,[int]$size=18,[string]$font='Segoe UI',[int]$color=16777215,[bool]$bold=$false,[bool]$italic=$false){
  $shape = $slide.Shapes.AddTextbox(1,$left,$top,$width,$height)
  $shape.TextFrame.WordWrap = $true
  $shape.TextFrame.MarginLeft = 4
  $shape.TextFrame.MarginRight = 4
  $shape.TextFrame.MarginTop = 2
  $shape.TextFrame.MarginBottom = 2
  $range = $shape.TextFrame.TextRange
  $range.Text = $text
  $range.Font.Name = $font
  $range.Font.Size = $size
  $range.Font.Color.RGB = $color
  $range.Font.Bold = $bold
  $range.Font.Italic = $italic
  return $shape
}
function AddCard($slide,$left,$top,$width,$height,$title,$body,$accent,[int]$bodySize=14){
  $card = $slide.Shapes.AddShape(5,$left,$top,$width,$height)
  $card.Fill.Solid(); $card.Fill.ForeColor.RGB = (Rgb 17 24 39)
  $card.Line.ForeColor.RGB = (Rgb 51 65 85)
  $card.Line.Weight = 1.25
  $accentBar = $slide.Shapes.AddShape(1,$left+14,$top+14,4,$height-28)
  $accentBar.Fill.Solid(); $accentBar.Fill.ForeColor.RGB = $accent; $accentBar.Line.Visible = 0
  AddTextbox $slide ($left+28) ($top+12) ($width-42) 28 $title 18 'Segoe UI Semibold' (Rgb 248 250 252) $true | Out-Null
  AddTextbox $slide ($left+28) ($top+44) ($width-42) ($height-54) $body $bodySize 'Segoe UI' (Rgb 203 213 225) $false | Out-Null
}
function AddSlideNumber($slide,[int]$num){
  AddTextbox $slide 905 512 40 18 ([string]$num) 10 'Segoe UI' (Rgb 148 163 184) $false | Out-Null
}
$app = New-Object -ComObject PowerPoint.Application
$app.Visible = $false
$pres = $app.Presentations.Add()
$pres.PageSetup.SlideWidth = 960
$pres.PageSetup.SlideHeight = 540
$blank = 12
$blue = Rgb 59 130 246
$cyan = Rgb 14 165 233
$green = Rgb 16 185 129
$amber = Rgb 245 158 11
$text = Rgb 248 250 252
$subtle = Rgb 203 213 225

# Slide 1
$slide = $pres.Slides.Add(1,$blank)
SetBg $slide 15 23 42
$bar = $slide.Shapes.AddShape(1,0,0,18,540); $bar.Fill.Solid(); $bar.Fill.ForeColor.RGB = $blue; $bar.Line.Visible = 0
$glow = $slide.Shapes.AddShape(5,38,58,310,318); $glow.Fill.Solid(); $glow.Fill.ForeColor.RGB = Rgb 30 41 59; $glow.Fill.Transparency = 0.18; $glow.Line.Visible = 0
AddTextbox $slide 54 68 560 72 'NexusJobs' 34 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 54 134 560 92 'Full Stack Job Portal' 24 'Segoe UI' $subtle $false | Out-Null
AddTextbox $slide 54 194 540 92 'Modern React frontend. Spring Boot backend. Role-based dashboards for Employees, Recruiters, and Admins.' 18 'Segoe UI' $subtle $false | Out-Null
$info = $slide.Shapes.AddShape(5,620,68,290,336); $info.Fill.Solid(); $info.Fill.ForeColor.RGB = Rgb 17 24 39; $info.Line.ForeColor.RGB = Rgb 51 65 85; $info.Line.Weight = 1.25
AddTextbox $slide 646 98 220 30 'Project Snapshot' 18 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 646 146 220 150 '• Search and browse jobs' + "`r`n" + '• Apply with profile and resume link' + "`r`n" + '• Recruiter job posting and applicant review' + "`r`n" + '• Admin control panel for platform management' 15 'Segoe UI' $subtle $false | Out-Null
AddTextbox $slide 646 304 220 60 'Frontend: React + Vite' + "`r`n" + 'Backend: Spring Boot + JPA' 14 'Segoe UI Semibold' $text $true | Out-Null
$chip1 = $slide.Shapes.AddShape(5,54,378,132,38); $chip1.Fill.Solid(); $chip1.Fill.ForeColor.RGB = Rgb 30 64 175; $chip1.Line.Visible = 0
$chip2 = $slide.Shapes.AddShape(5,198,378,132,38); $chip2.Fill.Solid(); $chip2.Fill.ForeColor.RGB = Rgb 15 118 110; $chip2.Line.Visible = 0
$chip3 = $slide.Shapes.AddShape(5,342,378,132,38); $chip3.Fill.Solid(); $chip3.Fill.ForeColor.RGB = Rgb 124 45 18; $chip3.Line.Visible = 0
AddTextbox $slide 70 386 104 18 'Role-based' 12 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 214 386 106 18 'Search + Apply' 12 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 358 386 108 18 'Recruiter Tools' 12 'Segoe UI Semibold' $text $true | Out-Null
AddSlideNumber $slide 1

# Slide 2 Overview
$slide = $pres.Slides.Add(2,$blank)
SetBg $slide 15 23 42
AddTextbox $slide 40 28 620 42 'Project Overview' 26 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 40 66 650 34 'A job portal that connects candidates, recruiters, and administrators in one workflow.' 16 'Segoe UI' $subtle $false | Out-Null
AddCard $slide 40 120 275 290 'Problem' 'Job discovery, hiring, and application tracking are often scattered across different tools. This project centralizes all three roles into one portal.' $blue
AddCard $slide 343 120 275 290 'Solution' 'NexusJobs combines searchable listings, role routing, application tracking, recruiter dashboards, and admin management inside a single full-stack application.' $cyan
AddCard $slide 646 120 275 290 'Outcome' 'Users can browse and apply quickly, recruiters can post and review applicants, and admins can monitor the entire platform from one control panel.' $green
AddSlideNumber $slide 2

# Slide 3 Tech Stack
$slide = $pres.Slides.Add(3,$blank)
SetBg $slide 15 23 42
AddTextbox $slide 40 28 620 42 'Technology Stack' 26 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 40 66 620 28 'Frontend, backend, database, and build tooling used in the project.' 16 'Segoe UI' $subtle $false | Out-Null
AddCard $slide 40 118 200 170 'Frontend' 'ReactJS' + "`r`n" + 'Vite' + "`r`n" + 'Axios' + "`r`n" + 'React Router DOM' $blue 13
AddCard $slide 256 118 200 170 'Backend' 'Spring Boot 4.0.5' + "`r`n" + 'Spring WebMVC' + "`r`n" + 'Spring Data JPA' + "`r`n" + 'Lombok' $cyan 13
AddCard $slide 472 118 200 170 'Database' 'H2 in-memory database' + "`r`n" + 'MySQL connector ready' + "`r`n" + 'JPA entities and repositories' $green 13
AddCard $slide 688 118 232 170 'Build & Tooling' 'Maven Wrapper' + "`r`n" + 'maven-compiler-plugin' + "`r`n" + 'maven-surefire-plugin support' + "`r`n" + 'Spring Boot Maven Plugin' $amber 13
AddCard $slide 40 316 880 138 'Design Language' 'Dark slate surfaces, bright blue accents, glass-like cards, and motion-focused UI styling create a premium visual identity for the portal.' $blue 16
AddSlideNumber $slide 3

# Slide 4 Core Features
$slide = $pres.Slides.Add(4,$blank)
SetBg $slide 15 23 42
AddTextbox $slide 40 28 620 42 'Core Features' 26 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 40 66 620 28 'The application is organized around the tasks each role needs to complete.' 16 'Segoe UI' $subtle $false | Out-Null
AddCard $slide 40 118 410 142 'Job Search & Discovery' 'Search listings by title or company, browse location and salary details, and open a dedicated job application modal.' $blue 14
AddCard $slide 500 118 408 142 'Employee Applications' 'Submit profile details, degree, skills, experience, cover letter, portfolio, and resume URL. Track status changes after submission.' $cyan 14
AddCard $slide 40 282 410 142 'Recruiter Workspace' 'Post jobs, manage listings, view applicants for each job, and move candidates through a status pipeline.' $green 14
AddCard $slide 500 282 408 142 'Admin Control Panel' 'Review all users, all jobs, and all applications from one dashboard, with delete actions for moderation.' $amber 14
AddSlideNumber $slide 4

# Slide 5 Roles and Workflow
$slide = $pres.Slides.Add(5,$blank)
SetBg $slide 15 23 42
AddTextbox $slide 40 28 620 42 'User Roles & Workflow' 26 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 40 66 620 28 'Each role is routed to a different dashboard after login.' 16 'Segoe UI' $subtle $false | Out-Null
AddCard $slide 40 120 250 280 'Employee' '• Register or log in' + "`r`n" + '• Browse and search jobs' + "`r`n" + '• Apply with profile details' + "`r`n" + '• Monitor application status' $blue 14
AddCard $slide 355 120 250 280 'Recruiter' '• Register with company name' + "`r`n" + '• Create and delete job posts' + "`r`n" + '• Review applicants' + "`r`n" + '• Update candidate status' $cyan 14
AddCard $slide 670 120 250 280 'Admin' '• View every user' + "`r`n" + '• View every job posting' + "`r`n" + '• View all applications' + "`r`n" + '• Remove jobs when needed' $green 14
AddTextbox $slide 88 420 760 44 'Login and registration are role-aware, so the landing page routes users directly to the correct workspace.' 16 'Segoe UI Semibold' $subtle $false | Out-Null
AddSlideNumber $slide 5

# Slide 6 Backend Architecture
$slide = $pres.Slides.Add(6,$blank)
SetBg $slide 15 23 42
AddTextbox $slide 40 28 660 42 'Backend Architecture & APIs' 26 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 40 66 700 28 'REST controllers expose the core operations for authentication, jobs, and applications.' 16 'Segoe UI' $subtle $false | Out-Null
AddCard $slide 40 120 190 320 'Controllers' '/api/auth' + "`r`n" + '/api/jobs' + "`r`n" + '/api/applications' + "`r`n`r`n" + 'Handle login, job CRUD, application submission, and status changes.' $blue 13
AddCard $slide 252 120 190 320 'Repositories' 'UserRepository' + "`r`n" + 'JobRepository' + "`r`n" + 'JobApplicationRepository' + "`r`n`r`n" + 'Spring Data JPA methods support lookup by email, recruiter, employee, and job.' $cyan 13
AddCard $slide 464 120 190 320 'Entities' 'User' + "`r`n" + 'Job' + "`r`n" + 'JobApplication' + "`r`n`r`n" + 'JPA entities model the relationships between people, jobs, and submitted applications.' $green 13
AddCard $slide 676 120 244 320 'Key Endpoints' 'POST /api/auth/login' + "`r`n" + 'POST /api/auth/register' + "`r`n" + 'GET /api/jobs?search=' + "`r`n" + 'GET /api/applications/job/{id}' + "`r`n" + 'PUT /api/applications/{id}/status' $amber 13
AddSlideNumber $slide 6

# Slide 7 Data Model
$slide = $pres.Slides.Add(7,$blank)
SetBg $slide 15 23 42
AddTextbox $slide 40 28 620 42 'Data Model' 26 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 40 66 660 28 'The app centers on three entities with clear many-to-one relationships.' 16 'Segoe UI' $subtle $false | Out-Null
AddCard $slide 40 120 270 280 'User' 'id, name, email, password, role, companyName' + "`r`n`r`n" + 'Represents employees, recruiters, and admins.' $blue 14
AddCard $slide 345 120 270 280 'Job' 'id, title, company, location, description, salary, type, recruiter' + "`r`n`r`n" + 'Stores job listings published by recruiters.' $cyan 14
AddCard $slide 650 120 270 280 'JobApplication' 'job, employee, status, personal details, academic details, experience, cover letter, resumeUrl' + "`r`n`r`n" + 'Captures the full application packet for each candidate.' $green 14
AddTextbox $slide 120 420 700 30 'Relationships: Recruiter → Jobs, Employee → Applications, Job → Applications' 16 'Segoe UI Semibold' $subtle $false | Out-Null
AddSlideNumber $slide 7

# Slide 8 Run and Demo
$slide = $pres.Slides.Add(8,$blank)
SetBg $slide 15 23 42
AddTextbox $slide 40 28 620 42 "Run Instructions & Demo Access" 26 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 40 66 720 28 'The backend runs on port 8080 and the frontend on port 5173.' 16 'Segoe UI' $subtle $false | Out-Null
AddCard $slide 40 120 280 250 'Backend' 'cd backend' + "`r`n" + './mvnw spring-boot:run' + "`r`n`r`n" + 'Spring Boot starts on http://localhost:8080' $blue 15
AddCard $slide 340 120 280 250 'Frontend' 'cd frontend' + "`r`n" + 'npm install' + "`r`n" + 'npm run dev' + "`r`n`r`n" + 'Vite dev server runs on http://localhost:5173' $cyan 15
AddCard $slide 640 120 280 250 "Demo & Database" 'Recruiter: hr@techmahindra.com / hr123' + "`r`n" + 'Employee: amit@gmail.com / emp123' + "`r`n`r`n" + 'H2 console: /h2-console' + "`r`n" + 'JDBC: jdbc:h2:mem:jobportaldb' $green 13
AddTextbox $slide 78 396 804 46 'The backend seeds four demo jobs automatically, so the portal is ready to explore immediately after startup.' 16 'Segoe UI Semibold' $subtle $false | Out-Null
AddSlideNumber $slide 8

# Slide 9 Future Scope
$slide = $pres.Slides.Add(9,$blank)
SetBg $slide 15 23 42
AddTextbox $slide 40 28 620 42 'Key Highlights and Future Scope' 26 'Segoe UI Semibold' $text $true | Out-Null
AddTextbox $slide 40 66 700 28 'The current build is complete enough for a milestone demo, but several production hardening steps remain.' 16 'Segoe UI' $subtle $false | Out-Null
AddCard $slide 40 120 250 280 'Highlights' '• Clean role-based navigation' + "`r`n" + '• Searchable job listings' + "`r`n" + '• Recruiter applicant pipeline' + "`r`n" + '• Admin oversight tools' $blue 14
AddCard $slide 355 120 250 280 'Hardening Next' '• Add Spring Security / JWT' + "`r`n" + '• Hash stored passwords' + "`r`n" + '• Persist to MySQL' + "`r`n" + '• Validate forms server-side' $amber 14
AddCard $slide 670 120 250 280 'Polish Next' '• File uploads for resumes' + "`r`n" + '• Pagination and sorting' + "`r`n" + '• Email notifications' + "`r`n" + '• Richer analytics dashboards' $green 14
AddTextbox $slide 132 420 696 30 'This deck can be extended with screenshots once you place the original template or app captures in the workspace.' 15 'Segoe UI' $subtle $false | Out-Null
AddSlideNumber $slide 9

$pres.SaveAs($path)
$pres.Close()
$app.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($app) | Out-Null
Write-Host "SAVED:$path"