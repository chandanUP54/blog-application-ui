import { useContext, useEffect, useRef, useState } from "react";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "./Datatable.css";
import { jwtDecode } from "jwt-decode";
import { BASE_API_URL } from "../auth/url";
import $ from "jquery";
import { Editor } from "@tinymce/tinymce-react";
import { AuthContext } from "../context/AuthContext";

const AdminDatatable = () => {

  const {isTokenExpired,handleLogout}=useContext(AuthContext)
  const jwt = localStorage.getItem("accessJwt");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRowId, setEditRowId] = useState(null);

  const dataTableRef = useRef(null); // Create a ref for the DataTable instance

  function unescapeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  function stripHtml(html) {
    const txt = document.createElement("div");
    txt.innerHTML = html;
    return txt.innerText || txt.textContent; // Use innerText or textContent for plain text
  }


  useEffect(() => {

    if (jwt && isTokenExpired(jwt)) {
      handleLogout();
    }

    dataTableRef.current = $("#datatable").DataTable({
      serverSide: true,
      // processing: true,
      select: true,
      ajax: {
        url: `${BASE_API_URL}/blogs/allx`,
        type: "POST",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        data: (d) => JSON.stringify(d),
        dataSrc: (json) => json.data,
      },
      columns: [
        { data: "id" },
        { data: "title" },
        { data: "summary" },
        { data: "createdAt" },
        { data: "publishedAt" },
      ],
      rowCallback: (row, data) => {
        if (data.publishedAt) {
          $("td:eq(1)", row).html(
            `<a href="/blog/view/${data.id}" className="text-blue-600">${data.title}</a>`
          );
        }
      },
      columnDefs: [
        {
          targets: [3, 4],
          render: (data) => {
            if (!data) return "";
            const date = new Date(data);
            return `${date
              .getDate()
              .toString()
              .padStart(2, "0")} ${date.toLocaleString("default", {
              month: "short",
            })} ${date.getFullYear()} ${date
              .getHours()
              .toString()
              .padStart(2, "0")}:${date
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;
          },
        },
        {
          targets: [2],
          render: (data) => {
            if (!data) return "";
            const withoutHtml = unescapeHtml(data);
            const plainText = stripHtml(withoutHtml);
            return plainText.length >= 150
              ? `${plainText.substring(0, 150)}.....`
              : plainText;
          },
        },
      ],
    });

    dataTableRef.current.on("click", "tbody tr", (e) => {
      let classList = e.currentTarget.classList;

      if (classList.contains("selected")) {
        classList.remove("selected");
      } else {
        dataTableRef.current
          .rows(".selected")
          .nodes()
          .each((row) => row.classList.remove("selected"));
        classList.add("selected");

        resetForm();
      }
    });

    return () => {
      dataTableRef.current.destroy();
    };
  }, [jwt]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      summary,
      content,
    };

   // console.log("is edit mode", isEditMode, editRowId);

    if (isEditMode) {
      //console.log("editing-->>");

      fetch(`${BASE_API_URL}/blogs/edit/${editRowId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Success:", data);
          resetForm();
          dataTableRef.current.ajax.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
     // console.log("posting-->>");

      fetch(`${BASE_API_URL}/blogs/post`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          //console.log("Success:", data);
          resetForm();
          dataTableRef.current.ajax.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleEdit = () => {
    const tablesel = dataTableRef.current.row(".selected");
    const tableData = tablesel.data();

    if (tableData === undefined) {
      alert("please selected row");
    } else {
      setTitle(tableData.title);
      setSummary(tableData.summary);
      setContent(tableData.content);
      setIsEditMode(true);
      setEditRowId(tableData.id);
      // $("#saveform").text("Edit it")
    }
  };

  const handleDelete = () => {
    const tablesel = dataTableRef.current.row(".selected");
    const tableData = tablesel.data();

    if (tableData === undefined) {
      alert("please selected row");
    } else {
      const id = tableData.id;

      let confirmDelete = window.confirm("Do You Want to Delete?");

      if (confirmDelete) {
        $.ajax({
          url: `${BASE_API_URL}/blogs/delete/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          success: function () {
            dataTableRef.current.ajax.reload();
            resetForm()
          },
        });
      }
    }
  };

  const handlePublish = () => {
    const tablesel = dataTableRef.current.row(".selected");
    const tableData = tablesel.data();

    if (tableData === undefined) {
      alert("please selected row");
    } else {
      if (tableData.publishedAt === null) {
        const id = tableData.id;

        let confirmPublish = window.confirm("Do You Want to Publish?");

        if (confirmPublish) {
          $.ajax({
            url: `${BASE_API_URL}/blogs/publish/${id}`,
            method: "POST",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            success: function () {
              dataTableRef.current.ajax.reload();
            },
          });
        }
      } else {
        alert("already published");
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setSummary("");
    setContent("");
    setIsEditMode(false);
    setEditRowId(null);
  };

  return (
    <div>
      <div>
        <table className="display" id="datatable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Summary</th>
              <th>Created At</th>
              <th>Published At</th>
            </tr>
          </thead>
        </table>

        <div>
          <button
            type="editbtn"
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            type="deletebtn"
            className="bg-red-500 text-white px-4 py-2 mx-4 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="publishbtn"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
      <hr className="mt-5 mb-5" />
      <div>
        <form className="m-5" id="datatableform" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              className="form-control mt-1 border rounded w-full p-2"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Summary</label>
            <Editor
              apiKey="kcke9qjp1i7gzufy796i8r8f4k9zu8dfpo8x131sz53e5bbq"
              value={summary}
              onEditorChange={(newContent) => setSummary(newContent)}
              init={{
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen insertdatetime media",
                  "table help wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
              }}
            />
          </div>
          <div>
            <label>Content</label>
            <Editor
              apiKey="kcke9qjp1i7gzufy796i8r8f4k9zu8dfpo8x131sz53e5bbq"
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen insertdatetime media",
                  "table help wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              id="saveform"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isEditMode ? "Update It" : "New Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDatatable;
