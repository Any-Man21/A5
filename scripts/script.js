// the Elements
const issuesContainer = document.getElementById("issueCards");
const searchInput = document.getElementById("input-search");
const searchButton = document.getElementById("search-btn");
const btnAll = document.getElementById("btn-all");

const btnOpen = document.getElementById("btn-opened");
const btnClosed = document.getElementById("btn-closed");
const counter = document.getElementById("counter");
let allIssues = [];



const manageSpinner = (show)=>{
  if(show == true){
    document.getElementById("spinner").classList.remove("hide");
    document.getElementById("issueCards").classList.add("hide");
  }else{
    document.getElementById("spinner").classList.add("hide");
    document.getElementById("issueCards").classList.remove("hide");
  }
}

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

// activeBtn

function setActiveBtn(activeBtn){
  const buttons = [btnAll, btnOpen, btnClosed];
  buttons.forEach(btn => {
    btn.classList.remove("btn-primary")
    btn.classList.add("bg-white", "text-black")
  });

  activeBtn.classList.add("btn-primary")
  activeBtn.classList.remove("bg-white", "text-black")

}


// get all issues
async function displayIssues() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    allIssues = data.data;
    renderIssues(allIssues);
    
    // issuesContainer.innerHTML = '';
    
    // loop through all issues
//     issues.forEach(issue => {
//       // adding options for color and images
//         const topBorderColor = issue.status === 'open' ? 'bg-emerald-500' : 'bg-purple-500';
//         const circleColor = issue.status === 'open' ? 'success' : 'purple-500';
//         const statusImg = issue.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed-Status.png';

//         const card = document.createElement("div");
//         card.classList.add("cursor-pointer", "card", "bg-base-100", "shadow-xl", "hover:shadow-2xl", "h-full", "rounded-2xl");

//         card.addEventListener('click', () => {
//             showIssueDetails(issue.id);
//         });
//         // card content
//         card.innerHTML = `
//         <div class="w-full h-full bg-base-100 shadow-sm border border-base-200 overflow-hidden flex flex-col rounded-2xl">
//           <div class="h-1.5 ${topBorderColor} w-full"></div>

//           <div class="card-body p-5 flex flex-col flex-1">
//             <div class="flex justify-between items-start mb-2">
//               <div class="avatar placeholder">
//                 <div class="bg-${circleColor}/10 text-${circleColor} rounded-full w-10 h-10 border-2 border-${circleColor} border-dashed flex items-center justify-center overflow-hidden">
//                   <img src="${statusImg}" alt="${issue.status}" class="w-6 h-6 object-contain" />
//                 </div>
//               </div>
//               <div class="badge badge-error badge-outline font-bold py-3 uppercase text-[10px]">${issue.priority}</div>
//             </div>

//             <div class="flex-1"> <h2 class="card-title text-slate-800 leading-tight mb-1">${issue.title}</h2>
    
//             <div class="overflow-hidden">
//    <p class="text-slate-500 text-sm clamp-2">
//        ${issue.description}
//    </p>
// </div>
//         </div>

//             <div class="card-actions justify-start mt-4 gap-2">
//                <div class="badge badge-outline border-error text-error gap-1 font-bold text-[10px]">🤖 ${issue.labels[0] || 'BUG'}</div>
//                <div class="badge badge-outline border-warning text-warning gap-1 font-bold text-[10px]">⚙️ ${issue.labels[1] || 'TASK'}</div>
//             </div>

//             <div class="divider -mx-5 my-4 opacity-50 mt-auto"></div>

//             <div class="text-xs text-base-content/60 space-y-1">
//               <p>#${issue.id} by <span class="link link-hover font-bold">${issue.author}</span></p>
//               <p>Created on ${new Date(issue.createdAt).toLocaleDateString()}</p>
//             </div>
//           </div>
//         </div>`;
        
        
//         issuesContainer.appendChild(card);
//     });
}


// function to show issue details in modal

async function showIssueDetails(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;
    // display issue details
    document.getElementById('modal-title').innerText = issue.title;
    document.getElementById('modal-description').innerText = issue.description;
    document.getElementById('modal-author').innerText = issue.author;
    document.getElementById('modal-date').innerText = new Date(issue.createdAt).toLocaleDateString();
    document.getElementById('modal-assignee').innerText = issue.assignee || "Unassigned";
    // adding in
    const statusEl = document.getElementById('modal-status');
    statusEl.innerText = issue.status;
    statusEl.className = `badge ${issue.status === 'open' ? 'badge-success' : 'bg-purple-500'} gap-1 text-white py-4 px-4 font-semibold uppercase`;

    // options
    const priorityEl = document.getElementById('modal-priority');
    priorityEl.innerText = issue.priority;
    priorityEl.className = `badge ${issue.priority === 'high' ? 'badge-error' : 'badge-warning'} text-white font-bold py-3 px-6 uppercase`;

    // labels, also emptying
    const labelContainer = document.getElementById('modal-labels');
    labelContainer.innerHTML = issue.labels.map(l => `
        <div class="badge badge-outline border-slate-200 bg-slate-50 text-slate-600 gap-1 font-bold py-3 px-4 uppercase text-[10px]">
            ${l.toLowerCase().includes('bug') ? '🤖' : '⚙️'} ${l}
        </div>
    `).join('');

    document.getElementById('issue_modal').showModal();
}
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
async function renderIssues(issues) {
  // shows loading
  manageSpinner(true);

  await sleep(50);
  
  issuesContainer.innerHTML = '';
  issues.forEach(issue => {
    const topBorderColor = issue.status === 'open' ? 'border-t-green-500' : 'border-t-purple-500';
    const circleColor = issue.status === 'open' ? 'green' : 'purple';
    const statusImg = issue.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed-Status.png';

    const card = document.createElement('div');
    card.classList.add("cursor-pointer","card","bg-base-100","shadow-xl","hover:shadow-2xl","h-full","rounded-2xl");

    // eventlistener to click
    card.addEventListener('click', () => {
      showIssueDetails(issue.id);
    });

    // card content
    card.innerHTML = `
        <div class="w-full h-full bg-base-100 shadow-sm border border-base-200 overflow-hidden flex flex-col rounded-2xl">
          <div class="h-1.5 ${topBorderColor} w-full"></div>

          <div class="card-body p-5 flex flex-col flex-1">
            <div class="flex justify-between items-start mb-2">
              <div class="avatar placeholder">
                <div class="bg-${circleColor}/10 text-${circleColor} rounded-full w-10 h-10 border-2 border-${circleColor} border-dashed flex items-center justify-center overflow-hidden">
                  <img src="${statusImg}" alt="${issue.status}" class="w-6 h-6 object-contain" />
                </div>
              </div>
              <div class="badge badge-error badge-outline font-bold py-3 uppercase text-[10px]">${issue.priority}</div>
            </div>

            <div class="flex-1"> <h2 class="card-title text-slate-800 leading-tight mb-1">${issue.title}</h2>
    
            <div class="overflow-hidden">
   <p class="text-slate-500 text-sm clamp-2">
       ${issue.description}
   </p>
</div>
        </div>

            <div class="card-actions justify-start mt-4 gap-2">
               <div class="badge badge-outline border-error text-error gap-1 font-bold text-[10px]">🤖 ${issue.labels[0] || 'BUG'}</div>
               <div class="badge badge-outline border-warning text-warning gap-1 font-bold text-[10px]">⚙️ ${issue.labels[1] || 'TASK'}</div>
            </div>

            <div class="divider -mx-5 my-4 opacity-50 mt-auto"></div>

            <div class="text-xs text-base-content/60 space-y-1">
              <p>#${issue.id} by <span class="link link-hover font-bold">${issue.author}</span></p>
              <p>Created on ${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>`;
        

    issuesContainer.appendChild(card);

  });
  // update counter
  counter.innerText = `${issues.length} issues`;

  manageSpinner(false); //hides loading
}

btnAll.addEventListener('click', () => {
  setActiveBtn(btnAll);
  renderIssues(allIssues);
});

btnOpen.addEventListener('click', () => {
  setActiveBtn(btnOpen);
  const opened = allIssues.filter(issue => issue.status === 'open');
  renderIssues(opened);
});

btnClosed.addEventListener('click', () => {
  setActiveBtn(btnClosed);
  const closed = allIssues.filter(issue => issue.status === 'closed');
  renderIssues(closed);
});

displayIssues();
