const express = require('express');
const knights = require('knights-canvas');
const fs = require('fs');
const axios = require('axios');
const app = express();

const downloadImage = async (url, filename) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(filename, Buffer.from(response.data, 'binary'));
};

app.get('/welcome-image', async (req, res) => {
  const username = req.query.username || 'Guru322';
  const guildName = req.query.guildName || 'GURUBOTS';
  const guildIcon = req.query.guildIcon || 'https://i.ibb.co/G5mJZxs/rin.jpg';
  const memberCount = req.query.memberCount || '120';
  const avatar = req.query.avatar || 'https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg';
  const background = req.query.background || 'https://i.ibb.co/4YBNyvP/images-76.jpg';

  try {
    // Download images
    await downloadImage(guildIcon, 'guildIcon.jpg');
    await downloadImage(avatar, 'avatar.jpg');
    await downloadImage(background, 'background.jpg');

    // Generate welcome image
    const image = await new knights.Welcome()
      .setUsername(username)
      .setGuildName(guildName)
      .setGuildIcon('./guildIcon.jpg')
      .setMemberCount(memberCount)
      .setAvatar('./avatar.jpg')
      .setBackground('./background.jpg')
      .toAttachment();

    const data = image.toBuffer();
    const filename = `welcome-${username}.png`;
    fs.writeFileSync(filename, data);

    res.sendFile(__dirname + '/' + filename);
  } catch (error) {
    console.error('Error generating welcome image:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Delete downloaded images
    fs.unlinkSync('guildIcon.jpg');
    fs.unlinkSync('avatar.jpg');
    fs.unlinkSync('background.jpg');
  }
});
app.get('/leave-image', async (req, res) => {
    const username = req.query.username || "Guru322";
    const guildName = req.query.guildName || "GURUBOTS";
    const guildIcon = req.query.guildIcon || "https://i.ibb.co/G5mJZxs/rin.jpg";
    const memberCount = req.query.memberCount || "120";
    const avatar = req.query.avatar || "https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg";
    const background = req.query.background || "https://i.ibb.co/4YBNyvP/images-76.jpg";

    try {
        // Download images
        await downloadImage(guildIcon, 'guildIcon.jpg');
        await downloadImage(avatar, 'avatar.jpg');
        await downloadImage(background, 'background.jpg');

        // Generate leave image
        const image = await new knights.Goodbye()
            .setUsername(username)
            .setGuildName(guildName)
            .setGuildIcon('./guildIcon.jpg')
            .setMemberCount(memberCount)
            .setAvatar('./avatar.jpg')
            .setBackground('./background.jpg')
            .toAttachment();

        const data = image.toBuffer();
        const filename = `leave-${username}.png`;
        fs.writeFileSync(filename, data);

        res.sendFile(__dirname + '/' + filename);
    } catch (error) {
        console.error('Error generating leave image:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Delete downloaded images
        fs.unlinkSync('guildIcon.jpg');
        fs.unlinkSync('avatar.jpg');
        fs.unlinkSync('background.jpg');
    }
});

app.get('/levelup-image', async (req, res) => {
    const avatar = req.query.avatar || 'https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg';
  
    try {
      // Download avatar
      await downloadImage(avatar, 'avatar.jpg');
  
      // Generate level up image
      const image = await new knights.Up()
        .setAvatar('./avatar.jpg')
        .toAttachment();
  
      const data = image.toBuffer();
      const filename = `levelup.png`;
      fs.writeFileSync(filename, data);
  
      res.sendFile(__dirname + '/' + filename);
    } catch (error) {
      console.error('Error generating level up image:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      // Delete downloaded avatar
      fs.unlinkSync('avatar.jpg');
    }
  });

  app.get('/rankup-image', async (req, res) => {
    const username = req.query.username || 'GURU';
    const currxp = req.query.currxp || '100';
    const needxp = req.query.needxp || '1000';
    const level = req.query.level || '6';
    const rank = req.query.rank || 'https://i.ibb.co/Wn9cvnv/FABLED.png';
    const avatar = req.query.avatar || 'https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg';
    const background = req.query.background || 'https://i.ibb.co/4YBNyvP/images-76.jpg';
  
    try {
      // Download images
      await downloadImage(avatar, 'avatar.jpg');
      await downloadImage(background, 'background.jpg');
      await downloadImage(rank, 'rank.png');
  
      // Generate rank up image
      const image = await new knights.Rank()
        .setUsername(username)
        .setBg('./background.jpg')
        .setNeedxp(needxp)
        .setCurrxp(currxp)
        .setLevel(level)
        .setRank('./rank.png')
        .setAvatar('./avatar.jpg')
        .toAttachment();
  
      const data = image.toBuffer();
      const filename = `rankup-${username}.png`;
      fs.writeFileSync(filename, data);
  
      res.sendFile(__dirname + '/' + filename);
    } catch (error) {
      console.error('Error generating rank up image:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      // Delete downloaded images
      fs.unlinkSync('avatar.jpg');
      fs.unlinkSync('background.jpg');
      fs.unlinkSync('rank.png');
    }
  });
  app.get('/jojo', async (req, res) => {
    const imageUrl = req.query.image || 'https://i.ibb.co/xG8L4mz/images.jpg';
  
    try {
      
      await downloadImage(imageUrl, 'image.jpg');
  
      const image = await new knights.Jo()
        .setImage('./image.jpg')
        .toBuild();
  
      const data = image.toBuffer();
      const filename = `jo-image.png`;
      fs.writeFileSync(filename, data);
  
      res.sendFile(__dirname + '/' + filename);
    } catch (error) {
      console.error('Error generating jojo image:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      
      fs.unlinkSync('image.jpg');
    }
  });
  
  


app.listen(3000, () => console.log('Server is running on port 3000'));
