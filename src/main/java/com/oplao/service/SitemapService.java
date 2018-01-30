package com.oplao.service;

import com.oplao.Application;
import com.oplao.model.GoogleSitemap;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.IOException;
import java.util.Date;

@Service
public final class SitemapService {
    private static final String BASE_URL = "https://new.oplao.com";
    private static final String FILE_LOC = System.getProperty("user.dir") + "\\src\\main\\webapp\\sitemap\\sitemap.xml";



    public String generateIndexSitemap(){

        return "";
    }

    public String buildSitemap(){
        GoogleSitemap sitemap = new GoogleSitemap();
//        sitemap.setPublicUrl(BASE_URL);

            sitemap.write();
        return null;
    }
}
