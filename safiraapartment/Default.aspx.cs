using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Windows.Forms;
using System.Net.Mail;
using System.Net;


public partial class safira_Default : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["seremban"].ConnectionString);

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void submitid_Click(object sender, EventArgs e)
    {
        if (pdpaCheckbox.Checked == true)
        {

            con.Open();
            SqlCommand cmd = new SqlCommand("INSERT INTO Properties (Name, Mobile, Email, DateTime, Project) VALUES (@Name, @Mobile, @Email, @DateTime, @Project)", con);
            cmd.CommandType = CommandType.Text;
            cmd.Parameters.AddWithValue("@Name", nameTxt.Text);
            cmd.Parameters.AddWithValue("@Mobile", mobileTxt.Text);
            cmd.Parameters.AddWithValue("@Email", emailTxt.Text);
            cmd.Parameters.AddWithValue("@DateTime", DateTime.Now);
            cmd.Parameters.AddWithValue("@Project", "Safira");
            cmd.ExecuteNonQuery();

            con.Close();

            Response.Redirect("thank-you.aspx");

        }
        else
        {
            submitmessage.ForeColor = System.Drawing.Color.Red;
            submitmessage.Text = "<br/>Please agree to register";

        }
    }

}