const issuesContainer = document.getElementById("issueCards");
const searchInput = document.getElementById("input-search");
const searchButton = document.getElementById("search-btn");
const btnAll = document.getElementById("btn-all");

const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");
const counter = document.getElementById("counter");



// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"


// get all issues
async function displayIssues() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const issues = data.data;
    console.log(issues);
    
    issuesContainer.innerHTML = '';
    issues.forEach(issue => {
      const topBorderColor = issue.status === 'open' ? 'bg-emerald-500' : 'bg-purple-500';

      // Optional: You can also update the inner icon circle color to match
      const circleTheme = issue.status === 'open' ? 'emerald' : 'purple';
      // 1. DETERMINE STATUS IMAGE AND TOP BAR COLOR
      const statusImg = issue.status === 'open' 
    ? 'assets/Open-Status.png' 
    : 'assets/Closed- Status .png';

      // Optional: Change the border color based on status (success/green for open, slate/gray for closed)
      const circleColor = issue.status === 'open' ? 'success' : 'purple-100';
      const card = document.createElement("div");
      card.classList.add("card", "bg-base-100", "shadow-xl", "hover:shadow-2xl", "h-full", "rounded-2xl");
      card.innerHTML = `
      <div class="w-full h-full bg-base-100 shadow-sm border border-base-200 overflow-hidden flex flex-col rounded-2xl">
  <div class="h-1.5 ${topBorderColor} bg-success w-full"></div>

  <div class="card-body p-5 flex flex-col flex-1">
    <div class="flex justify-between items-start mb-2">
      <div class="avatar placeholder">
        <div class="bg-${circleColor}/10 text-${circleColor} rounded-full w-10 h-10 border-2 border-${circleColor} border-dashed flex items-center justify-center overflow-hidden">
    <img 
      src="${statusImg}" 
      alt="${issue.status}" 
      class="w-6 h-6 object-contain" 
    />
  </div>
      </div>
      <div class="badge badge-error badge-outline font-bold py-3">${issue.priority}</div>
    </div>

    <h2 class="card-title text-slate-800">${issue.title}</h2>
    <p class="text-slate-500 text-sm line-clamp-2">
      ${issue.description}
    </p>

    <div class="card-actions justify-start mt-4 gap-2">
      <div class="badge badge-outline border-error text-error gap-1 font-bold">
        🤖 ${issue.labels[0]}
      </div>
      <div class="badge badge-outline border-warning text-warning gap-1 font-bold">
        ⚙️ ${issue.labels[1]}
      </div>
    </div>

    <div class="divider -mx-5 my-4 opacity-50 mt-auto"></div>

    <div class="text-xs text-base-content/60 space-y-1">
      <p>#1 by <span class="link link-hover">${issue.author}</span></p>
      <p>Created on ${issue.createdAt} </br>
       Updated on ${issue.updatedAt}</p>
    </div>
  </div>
</div>
      `;
      issuesContainer.appendChild(card);
      })



}

displayIssues();