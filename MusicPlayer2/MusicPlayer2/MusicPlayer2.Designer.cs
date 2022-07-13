namespace MusicPlayer2
{
    partial class MusicPlayer2
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MusicPlayer2));
            this.TopPanel = new System.Windows.Forms.Panel();
            this.MusicLogo = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.MusicList = new System.Windows.Forms.ListBox();
            this.SelectSong = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.MusicPlayer = new AxWMPLib.AxWindowsMediaPlayer();
            this.TopPanel.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.MusicPlayer)).BeginInit();
            this.SuspendLayout();
            // 
            // TopPanel
            // 
            this.TopPanel.BackColor = System.Drawing.Color.IndianRed;
            this.TopPanel.Controls.Add(this.pictureBox1);
            this.TopPanel.Controls.Add(this.MusicLogo);
            this.TopPanel.Dock = System.Windows.Forms.DockStyle.Top;
            this.TopPanel.Location = new System.Drawing.Point(0, 0);
            this.TopPanel.Name = "TopPanel";
            this.TopPanel.Size = new System.Drawing.Size(949, 48);
            this.TopPanel.TabIndex = 0;
            // 
            // MusicLogo
            // 
            this.MusicLogo.AutoSize = true;
            this.MusicLogo.BackColor = System.Drawing.SystemColors.ControlDark;
            this.MusicLogo.Font = new System.Drawing.Font("Showcard Gothic", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.MusicLogo.ForeColor = System.Drawing.Color.Black;
            this.MusicLogo.Location = new System.Drawing.Point(21, 15);
            this.MusicLogo.Name = "MusicLogo";
            this.MusicLogo.Size = new System.Drawing.Size(83, 21);
            this.MusicLogo.TabIndex = 0;
            this.MusicLogo.Text = "MusicCB";
            this.MusicLogo.UseMnemonic = false;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox1.Image")));
            this.pictureBox1.Location = new System.Drawing.Point(902, 3);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(35, 33);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            this.pictureBox1.Click += new System.EventHandler(this.pictureBox1_Click);
            // 
            // MusicList
            // 
            this.MusicList.BackColor = System.Drawing.Color.IndianRed;
            this.MusicList.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.MusicList.Cursor = System.Windows.Forms.Cursors.No;
            this.MusicList.Font = new System.Drawing.Font("Showcard Gothic", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.MusicList.FormattingEnabled = true;
            this.MusicList.ItemHeight = 21;
            this.MusicList.Location = new System.Drawing.Point(686, 54);
            this.MusicList.Name = "MusicList";
            this.MusicList.Size = new System.Drawing.Size(251, 441);
            this.MusicList.TabIndex = 1;
            this.MusicList.SelectedIndexChanged += new System.EventHandler(this.MusicList_SelectedIndexChanged);
            // 
            // SelectSong
            // 
            this.SelectSong.BackColor = System.Drawing.Color.IndianRed;
            this.SelectSong.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.SelectSong.Font = new System.Drawing.Font("Showcard Gothic", 10.2F, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.SelectSong.ForeColor = System.Drawing.Color.Black;
            this.SelectSong.Location = new System.Drawing.Point(739, 503);
            this.SelectSong.Name = "SelectSong";
            this.SelectSong.Size = new System.Drawing.Size(148, 40);
            this.SelectSong.TabIndex = 2;
            this.SelectSong.Text = "Select Song ";
            this.SelectSong.UseVisualStyleBackColor = false;
            this.SelectSong.Click += new System.EventHandler(this.SelectSong_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.ForeColor = System.Drawing.Color.Red;
            this.label1.Location = new System.Drawing.Point(421, 540);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(187, 16);
            this.label1.TabIndex = 4;
            this.label1.Text = "Developed By: Carlos Barrera";
            // 
            // MusicPlayer
            // 
            this.MusicPlayer.Enabled = true;
            this.MusicPlayer.Location = new System.Drawing.Point(12, 54);
            this.MusicPlayer.Name = "MusicPlayer";
            this.MusicPlayer.OcxState = ((System.Windows.Forms.AxHost.State)(resources.GetObject("MusicPlayer.OcxState")));
            this.MusicPlayer.Size = new System.Drawing.Size(467, 368);
            this.MusicPlayer.TabIndex = 3;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.None;
            this.ClientSize = new System.Drawing.Size(949, 565);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.MusicPlayer);
            this.Controls.Add(this.SelectSong);
            this.Controls.Add(this.MusicList);
            this.Controls.Add(this.TopPanel);
            this.ForeColor = System.Drawing.Color.CornflowerBlue;
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Music Player App";
            this.TopPanel.ResumeLayout(false);
            this.TopPanel.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.MusicPlayer)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel TopPanel;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Label MusicLogo;
        private System.Windows.Forms.ListBox MusicList;
        private System.Windows.Forms.Button SelectSong;
        private AxWMPLib.AxWindowsMediaPlayer MusicPlayer;
        private System.Windows.Forms.Label label1;
    }
}

