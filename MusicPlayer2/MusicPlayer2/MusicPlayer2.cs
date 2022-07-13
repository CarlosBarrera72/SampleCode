using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MusicPlayer2
{
    public partial class MusicPlayer2 : Form
    {
        public MusicPlayer2()
        {
            InitializeComponent();
        }

        String[] paths, files;



        private void MusicList_SelectedIndexChanged(object sender, EventArgs e)
        {
            MusicPlayer.URL= paths[MusicList.SelectedIndex]; 
        }

        private void SelectSong_Click(object sender, EventArgs e)
        {
            OpenFileDialog file = new OpenFileDialog();

            file.Multiselect = true;

            if(file.ShowDialog() == System.Windows.Forms.DialogResult.OK)
            {
                files = file.SafeFileNames;
                paths = file.FileNames;

                for(int i = 0; i < files.Length; i++)
                {
                    MusicList.Items.Add(files[i]);
                }
            }
        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
