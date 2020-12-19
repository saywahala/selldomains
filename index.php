<?php
$domains = array(
    'ALQUOZ.AE' => array(
        'name' => 'Al Quoz',
        'meta_tags' => 'alquoz,industrial,dubai,alserkal,residential,art,galleries,carsales,storage,buy,domain,names',
        'meta_description' => ''
    ),
    /*'RECRUITMENTMENA.COM' => array(
        'name' => 'RECRUITMENT MENA',
        'meta_tags' => 'jobs,dubai,employment,work,uae,hiting,temping,newopportunities,working,recruitment,jobsearch,jobhunting,workingabroad,hiring,staff,buy,domain,names',
        'meta_description' => ''
    ),*/
    'RECRUITMENA.COM' => array(
        'name' => 'RECRUIT MENA',
        'meta_tags' => 'jobs,dubai,employment,work,uae,hiting,temping,newopportunities,working,recruitment,jobsearch,jobhunting,workingabroad,hiring,staff,buy,domain,names',
        'meta_description' => ''
    ),
    'EMPLOYMENA.COM' => array(
        'name' => 'EMPLOY MENA',
        'meta_tags' => 'jobs,dubai,employment,work,uae,hiting,temping,newopportunities,working,recruitment,jobsearch,jobhunting,workingabroad,hiring,staff,buy,domain,names',
        'meta_description' => ''
    ),
    'WELLBEING.AE' => array(
        'name' => 'WELLBEING',
        'meta_tags' => 'health,dubai,wellbeing,eat,healthy,yoga,fitness,diet,lifestyle,vitamins,,buy,domain,names',
        'meta_description' => ''
    ),
    'POPART.AE' => array(
        'name' => 'POP ART',
        'meta_tags' => 'art,dubai,popart,paintings,creative,warhol,galleries,buyart,artwork,arabian,,buy,domain,names',
        'meta_description' => ''
    ),
    'SATWA.AE' => array(
        'name' => 'SATWA',
        'meta_tags' => 'satwa,dubai,plantstreet,visitdubai,,buy,domain,names',
        'meta_description' => ''
    ),
    'SURFER.AE' => array(
        'name' => 'SURFER',
        'meta_tags' => 'dubai,watersports,surfing,surf,kayak,windsurfing,windsurf,sup,paddle,paddleboard,paddleboarding,outdoors,activity,ocean,jumeirah,beachmkitebeach,lamer,thebeach,jbr,,buy,domain,names',
        'meta_description' => ''
    ),
    'RAIN.AE' => array(
        'name' => 'RAIN',
        'meta_tags' => 'water,dubai,rain,cloudseeding,',
        'meta_description' => ''
    ),
    'VINO.AE' => array(
        'name' => 'VINO',
        'meta_tags' => 'wine,finewine,alcohol,beverages,dubai,a&e.mmi,africanandeastern,liquor,beer,spirits,gin,vodka,whisky,dutyfree',
        'meta_description' => ''
    ),
    'EMOJI.AE' => array(
        'name' => 'EMOJI',
        'meta_tags' => 'emoji,dubai,arabic,arabian,domain,sale,buy',
        'meta_description' => 'Emoji are ideograms and smileys used in electronic messages and web pages. Emoji exist in various genres, including facial expressions, common objects, places and types of weather, and animals. They are much like emoticons, but emoji are actual pictures instead of typographics.'
    ),
    'COOKIES.AE' => array(
        'name' => 'COOKIES',
        'meta_tags' => 'cookies,dubai,bakery,choc,chip,biscuits,bakedgoods',
        'meta_description' => 'A cookie is a baked or cooked food that is small, flat and sweet. It usually contains flour, sugar and some type of oil or fat. It may include other ingredients such as raisins, oats, chocolate chips, nuts, etc.'
    ),
    'GICLEE.AE' => array(
        'name' => 'GICLEE',
        'meta_tags' => 'giclee,printing,dubai,print,largeformat,fineart,art,posters,prints,glossy,paper,buy,domains,domainname',
        'meta_description' => 'Giclée  is a neologism coined in 1991 by printmaker Jack Duganne for fine art digital prints made on inkjet printers. The name originally applied to fine art prints created on Iris printers in a process invented in the late 1980s but has since come to mean any inkjet print'
    ),
    'TYPO.AE' => array(
        'name' => 'TYPO',
        'meta_tags' => 'typo,art,design,typing,dubai,uae,graphic,graphicdesign,buy,domain,',
        'meta_description' => ''
    ),
    'THREAD.AE' => array(
        'name' => 'THREAD',
        'meta_tags' => '',
        'meta_description' => ''
    ),
    'SNEAKERS.AE' => array(
        'name' => 'SNEAKERS',
        'meta_tags' => '',
        'meta_description' => ''
    ),
    'SHUTTERS.AE' => array(
        'name' => 'SHUTTERS',
        'meta_tags' => '',
        'meta_description' => ''
    ),
    'KICKS.AE' => array(
        'name' => 'KICKS',
        'meta_tags' => '',
        'meta_description' => ''
    ),
    'GRIND.AE' => array(
        'name' => 'GRIND',
        'meta_tags' => '',
        'meta_description' => ''
    ),
    'LAMOUR.AE' => array(
        'name' => 'LAMOUR',
        'meta_tags' => '',
        'meta_description' => ''
    ),
    'INSTALLATIONS.AE' => array(
        'name' => 'INSTALLATIONS',
        'meta_tags' => '',
        'meta_description' => ''
    ),
    'BITCOINWALLET.AE' => array(
        'name' => 'BITCOIN WALLET',
        'meta_tags' => '',
        'meta_description' => ''
    ),
    'BITCOINUAE.AE' => array(
        'name' => 'BITCOINUAE',
        'meta_tags' => '',
        'meta_description' => ''
    ),
);

$kdmains = array();
foreach ($domains as $key => $value) {
    $kdmains[] = strtolower($key);
}

$domain_name = 'alquoz.ae';
$ref_domain = @strtolower($_GET['dom']);

if (isset($ref_domain) && !empty($ref_domain) && in_array($ref_domain, $kdmains)) {
    $single_domain = $domains[strtoupper($ref_domain)];
    $single_domain['domain_name'] = $ref_domain;
} else {
    $single_domain = $domains[strtoupper($domain_name)];
    $single_domain['domain_name'] = $domain_name;
}
?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <!--meta-->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="robots" content="index, follow"/>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:300,400,500,700" rel="stylesheet">

        <!--css-->
        <link href="css/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
        <link href="css/fontello/css/fontello.css" rel="stylesheet" type="text/css"/>

        <link rel="stylesheet" type="text/css" href="css/common/base.css">
        <link rel="stylesheet" type="text/css" href="css/main/main.css?v=1.1">

        <script type="text/javascript" src="scripts/libs/jquery-3.1.1.min.js"></script>
        <script type="text/javascript" src="scripts/libs/jquery.effects.core.js"></script>     


        <link rel="icon" href="assets/images/icon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="assets/images/icon.ico" type="image/x-icon">

        <link rel="apple-touch-icon" href="assets/images/main/logo_icon.png">

        <!----------------------->
        <meta name="keywords" content="<?php echo $single_domain['meta_tags'] ?>"/>
        <meta name="description" content="<?php echo $single_domain['meta_description'] ?>"/>

        <title>Buy <?php echo strtoupper($single_domain['domain_name']) ?></title>
    </head>
    <body>
        <section class="main-section">
            <div class="content">
                <h1 class="fheader"><span><?php echo strtoupper($single_domain['domain_name']) ?></span> is for sale</h1>
                <h3 class="nheader">Need to buy this domain name? Make an offer</h3>
                <div class="cont_holder">
                    <div class="one_input">
                        <input type="number" value="" placeholder="Enter your bid in USD" name="bid"/>
                        <i class="fa fa-money"></i>
                    </div>

                    <div class="one_input">
                        <input type="text" value="" placeholder="Full Name" name="bid"/>
                        <i class="fa fa-user"></i>
                    </div>

                    <div class="one_input">
                        <input type="email" value="" placeholder="Email Address" name="bid"/>
                        <i class="fa fa-envelope"></i>
                    </div>

                    <button class="submit_btn lfl js_submit_form" type="button" name="submit">Make an offer</button>
                    <input type="hidden" value="<?php echo $single_domain['domain_name']?>" name="domain_name"/>

                    <div class="clear"></div>
                </div>
            </div>
            <div class="moverlay"></div>
        </section>

        <!---other-available-section-->
        <section class="other-available-section">
            <div class="content">
                <h2 class="mdheader">More Domains for sale</h2>
                <ul class="more_domains">
                    <?php if (!empty($domains)) foreach ($domains as $key => $item): ?>
                            <li class="lfl"><a href="<?php echo 'http://' . $key ?>"><?php echo $key ?></a></li>
                        <?php endforeach; ?>
                    <div class="clear"></div>
                </ul>
            </div>
        </section>


        <!---footer-section-->
        <section class="footer-section">
            <div class="content">
                <h4 class="cr">&COPY; <?php echo date('Y') ?> All Rights Reserved.</h4>
            </div>
        </section>
        <!--footer-section--->
        <script type="text/javascript" src="scripts/custom/common.js"></script>

    </body>
</html>
