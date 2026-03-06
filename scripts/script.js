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
      const card = document.createElement("div");
      card.classList.add("card", "bg-base-100", "shadow-xl", "hover:shadow-2xl", "h-full");
      card.innerHTML = `
      <div class="w-full h-full bg-base-100 shadow-sm border border-base-200 overflow-hidden flex flex-col">
  <div class="h-1.5 bg-success w-full"></div>

  <div class="card-body p-5 flex flex-col flex-1">
    <div class="flex justify-between items-start mb-2">
      <div class="avatar placeholder">
        <div class="bg-success/10 text-success rounded-full w-8 border-2 border-success border-dashed">
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