let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStroage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStroage) {
  myLeads = leadsFromLocalStroage
  render(myLeads)
}

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
    <a target='_blank' href='${leads[i]}'>
    ${leads[i]}
    </a>
    </li>`
  }
  ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", () => {
  localStorage.removeItem("myLeads")
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function (e) {
  if (inputEl.value === "") return
  myLeads.push(inputEl.value)
  inputEl.value = ""
  save()
  render(myLeads)
})

function save() {
  return localStorage.setItem("myLeads", JSON.stringify(myLeads))
}
