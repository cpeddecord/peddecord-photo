var fs = require('fs');
var path = require('path');
var mark = require('meta-marked');
var sizeOf = require('image-size');
var Exif = require('kinda-exif').ExifImage;


var diretoryTreeToObj = function(dir, done) {
    var results = [];

    fs.readdir(dir, function(err, list) {
        if (err)
            return done(err);

        var pending = list.length;

        if (!pending)
            return done(null, {name: path.basename(dir), type: 'folder', children: results});

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function(err, res) {
                        results.push({
                            name: path.basename(file),
                            type: 'folder',
                            children: res
                        });
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {
                    var fullPath = `${dir}/${path.basename(file)}`;

                    if (path.basename(file) === 'index.md') {
                      results.push(mark(fs.readFileSync(file).toString()));

                    } else if (path.basename(file).split('.')[1] === 'thumbnail') {
                      results.push({
                        thumbnail: path.basename(file),
                        dimensions: sizeOf(fullPath),
                        exif: new Exif({image: fullPath}).exifData
                      });

                    } else if (path.extname(file) === '.jpg') {
                      results.push({
                        image: path.basename(file),
                        dimensions: sizeOf(fullPath),
                        exif: new Exif({image: fullPath}).exifData
                      });
                    }

                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
};

module.exports = diretoryTreeToObj;
